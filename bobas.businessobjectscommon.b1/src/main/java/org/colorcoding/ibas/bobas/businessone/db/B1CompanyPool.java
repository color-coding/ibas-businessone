package org.colorcoding.ibas.bobas.businessone.db;

import java.lang.reflect.Method;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.B1DataConvert;
import org.colorcoding.ibas.bobas.businessone.data.B1Exception;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMUtil;
import com.sap.smb.sbo.wrapper.com.ComException;

public class B1CompanyPool {

	protected static final String MSG_B1_COMPANY_CONNECTING = "b1 company: [%s|%s] is connecting.";
	protected static final String MSG_B1_COMPANY_CONNECTED = "b1 company: [%s|%s] was connected.";
	protected static final String MSG_B1_COMPANY_WAITING = "b1 company: [%s|%s] is waiting.";
	protected static final String MSG_B1_COMPANY_RECYCLED = "b1 company: [%s|%s] was recycled.";
	protected static final String MSG_B1_COMPANY_RELEASED = "b1 company: [%s|%s] was released.";
	protected static final String MSG_B1_COMPANY_DATATIME = "b1 company: [%s|%s] datetime [%s %s].";

	public static final int POOL_SIZE = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_COMPANY_POOL_SIZE,
			1);
	public static final int RETRY_COUNT = 3;
	public static final int WAITING_TIME = 1000;

	public static ICompany use(IB1Connection connection) throws B1Exception {
		return getB1CompanyPool().obtain(connection);
	}

	public static boolean back(ICompany company) {
		return getB1CompanyPool().recycling(company);
	}

	public static void release(ICompany company) {
		if (company == null) {
			return;
		}
		String message = String.format(MSG_B1_COMPANY_RELEASED, company.getServer(), company.getCompanyDB());
		synchronized (company) {
			if (company.isConnected()) {
				company.disconnect();
			}
			try {
				company.release();
			} catch (Throwable ex) {
			}
		}
		System.gc();
		Logger.log(MessageLevel.INFO, message);
	}

	private volatile static B1CompanyPool b1CompanyPool = null;

	static final B1CompanyPool getB1CompanyPool() {
		if (b1CompanyPool == null) {
			synchronized (B1CompanyPool.class) {
				if (b1CompanyPool == null) {
					b1CompanyPool = new B1CompanyPool();
				}
			}
		}
		return b1CompanyPool;
	}

	protected ICompany createCompany(IB1Connection connection) throws B1Exception {
		ICompany company = SBOCOMUtil.newCompany();
		company.setServer(connection.getServer());
		company.setCompanyDB(connection.getCompanyDB());
		company.setUserName(connection.getUserName());
		company.setPassword(connection.getPassword());
		// 数据库相关
		if (connection.getDbServerType() <= 0) {
			company.setDbServerType(SBOCOMConstants.BoDataServerTypes_dst_MSSQL2008);
		} else {
			company.setDbServerType(connection.getDbServerType());
		}
		company.setDbUserName(connection.getDbUserName());
		company.setDbPassword(connection.getDbPassword());
		company.setUseTrusted(connection.isUseTrusted());
		// 语言
		if (connection.getLanguage() <= 0) {
			company.setLanguage(SBOCOMConstants.BoSuppLangs_ln_English);
		} else {
			company.setLanguage(connection.getLanguage());
		}
		// 许可证服务
		if (connection.getLicenseServer() == null || connection.getLicenseServer().isEmpty()) {
			if (connection.getServer() != null && !connection.getServer().isEmpty()) {
				if (connection.getServer().indexOf(":") > 0) {
					company.setLicenseServer(String.format("%s:30000", connection.getServer()).substring(0,
							connection.getServer().indexOf(":")));
				} else {
					company.setLicenseServer(String.format("%s:30000", connection.getServer()));
				}
			}
		} else {
			company.setLicenseServer(connection.getLicenseServer());
		}
		try {
			// 低版本兼容设置
			Method method = ICompany.class.getMethod("setSLDServer", String.class);
			if (connection.getSLDServer() == null || connection.getSLDServer().isEmpty()) {
				if (connection.getServer() != null && !connection.getServer().isEmpty()) {
					if (connection.getServer().indexOf(":") > 0) {
						method.invoke(company, String.format("%s:40000", connection.getServer()).substring(0,
								connection.getServer().indexOf(":")));
					} else {
						method.invoke(company, String.format("%s:40000", connection.getServer()));
					}
				}
			} else {
				method.invoke(company, connection.getSLDServer());
			}
		} catch (Throwable e) {
		}
		Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_CONNECTING, company.getServer(), company.getCompanyDB());
		if (company.connect() != 0) {
			int code = company.getLastErrorCode();
			String description = company.getLastErrorDescription();
			try {
				company.release();
			} catch (Throwable ex) {
			}
			throw new B1Exception(String.format("%s - %s", code, description));
		} else {
			Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_CONNECTED, company.getServer(), company.getCompanyDB());
		}
		return company;
	}

	public ICompany obtain(IB1Connection connection) throws B1Exception {
		if (connection == null) {
			return null;
		}
		if (this.wrappings == null || this.wrappings.length == 0) {
			return this.createCompany(connection);
		}
		synchronized (this.wrappings) {
			// 获取不到资源等待
			for (int count = 0; count < RETRY_COUNT; count++) {
				for (int i = 0; i < this.wrappings.length; i++) {
					B1CompanyWrapping wrapping = this.wrappings[i];
					if (wrapping == null) {
						continue;
					}
					ICompany company = wrapping.getCompany();
					if (company == null) {
						this.wrappings[i] = null;
						continue;
					}
					try {
						// 检查链接是否有效
						if (!company.isConnected()) {
							this.wrappings[i] = null;
							company.release();
							continue;
						}
						if (!company.getServer().equalsIgnoreCase(connection.getServer())) {
							continue;
						}
						if (!company.getCompanyDB().equalsIgnoreCase(connection.getCompanyDB())) {
							continue;
						}
						if (!company.getUserName().equalsIgnoreCase(connection.getUserName())) {
							continue;
						}
						Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_DATATIME, connection.getServer(),
								connection.getCompanyDB(), B1DataConvert.toString(company.getDBServerDate()),
								company.getDBServerTime());
						this.wrappings[i] = null;
						return company;
					} catch (ComException | Error e) {
						this.wrappings[i] = null;
						try {
							company.release();
						} catch (Throwable ex) {
							Logger.log(MessageLevel.ERROR, e.toString());
						}
						Logger.log(MessageLevel.ERROR, e.toString());
					}
				}
				Logger.log(MessageLevel.DEBUG, MSG_B1_COMPANY_WAITING, connection.getServer(),
						connection.getCompanyDB());
				try {
					Thread.sleep(WAITING_TIME);
				} catch (Exception e) {
					Logger.log(e);
				}
			}
		}
		return this.createCompany(connection);

	}

	public boolean recycling(ICompany company) {
		if (company == null) {
			return false;
		}
		if (this.wrappings == null) {
			this.wrappings = new B1CompanyWrapping[POOL_SIZE];
		}
		if (this.wrappings.length == 0) {
			return false;
		}
		synchronized (this.wrappings) {
			for (int i = 0; i < this.wrappings.length; i++) {
				B1CompanyWrapping wrapping = this.wrappings[i];
				if (wrapping != null) {
					continue;
				}
				this.wrappings[i] = new B1CompanyWrapping(company);
				Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_RECYCLED, company.getServer(), company.getCompanyDB());
				return true;
			}
		}
		return false;
	}

	private B1CompanyWrapping[] wrappings = null;

	protected class B1CompanyWrapping {
		public B1CompanyWrapping(ICompany company) {
			this.setCompany(company);
		}

		ICompany company;

		public ICompany getCompany() {
			return this.company;
		}

		public void setCompany(ICompany connection) {
			this.company = connection;
			if (this.company != null)
				this.setStowedTime(System.currentTimeMillis());
			else
				this.setStowedTime(-1);
		}

		long stowedTime;

		public long getStowedTime() {
			return stowedTime;
		}

		public void setStowedTime(long stowedTime) {
			this.stowedTime = stowedTime;
		}

	}
}
