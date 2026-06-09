package org.colorcoding.ibas.bobas.businessone.db;

import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

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
	protected static final String MSG_B1_COMPANY_EVICTED = "b1 company: [%s|%s] was evicted (idle timeout).";

	public static final int POOL_SIZE = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_COMPANY_POOL_SIZE,
			1);
	public static final int RETRY_COUNT = 3;
	public static final int WAITING_TIME = 1000;
	/** 空闲连接最大存活时间（毫秒），默认30分钟 */
	public static final long IDLE_TIMEOUT = MyConfiguration
			.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_COMPANY_IDLE_TIMEOUT, 30 * 60 * 1000L);
	/** 空闲连接清理间隔（毫秒），默认5分钟 */
	public static final long EVICT_INTERVAL = 5 * 60 * 1000L;

	/**
	 * 从连接池获取一个B1公司连接
	 *
	 * @param connection B1连接配置信息
	 * @return B1公司连接对象
	 * @throws B1Exception 连接获取失败时抛出
	 */
	public static ICompany use(IB1Connection connection) throws B1Exception {
		return getB1CompanyPool().obtain(connection);
	}

	/**
	 * 将B1公司连接归还到连接池
	 *
	 * @param company 要归还的B1公司连接对象
	 * @return true表示归还成功，false表示归还失败或池已满
	 */
	public static boolean back(ICompany company) {
		return getB1CompanyPool().recycling(company);
	}

	/**
	 * 释放B1公司连接，断开连接并释放COM对象资源
	 *
	 * @param company 要释放的B1公司连接对象
	 */
	public static void release(ICompany company) {
		if (company == null) {
			return;
		}
		String server = null;
		String companyDB = null;
		try {
			server = company.getServer();
			companyDB = company.getCompanyDB();
		} catch (ComException | Error e) {
			// 获取信息失败，可能COM对象已失效
		}
		String message = String.format(MSG_B1_COMPANY_RELEASED, server, companyDB);
		synchronized (company) {
			try {
				if (company.isConnected()) {
					company.disconnect();
				}
			} catch (Throwable ex) {
				// 忽略断开连接异常
			}
			try {
				company.release();
			} catch (Throwable ex) {
				// 忽略释放异常
			}
		}
		Logger.log(MessageLevel.INFO, message);
	}

	private volatile static B1CompanyPool b1CompanyPool = null;

	/**
	 * 获取B1公司连接池单例实例（双重检查锁定模式）
	 *
	 * @return B1公司连接池实例
	 */
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

	/**
	 * 截取服务器地址的host部分（去除端口），用于拼接默认的License/SLD地址
	 */
	protected static String extractHost(String server) {
		if (server == null || server.isEmpty()) {
			return server;
		}
		int colonIndex = server.indexOf(":");
		if (colonIndex > 0) {
			return server.substring(0, colonIndex);
		}
		return server;
	}

	/**
	 * 创建一个新的B1公司连接
	 *
	 * @param connection B1连接配置信息
	 * @return 创建的B1公司连接对象
	 * @throws B1Exception 连接创建或连接失败时抛出
	 */
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
			String host = extractHost(connection.getServer());
			if (host != null && !host.isEmpty()) {
				company.setLicenseServer(host + ":30000");
			}
		} else {
			company.setLicenseServer(connection.getLicenseServer());
		}
		try {
			// 低版本兼容设置
			Method method = ICompany.class.getMethod("setSLDServer", String.class);
			if (connection.getSLDServer() == null || connection.getSLDServer().isEmpty()) {
				String host = extractHost(connection.getServer());
				if (host != null && !host.isEmpty()) {
					method.invoke(company, host + ":40000");
				}
			} else {
				method.invoke(company, connection.getSLDServer());
			}
		} catch (Throwable e) {
			// 低版本无此方法，忽略
		}
		Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_CONNECTING, company.getServer(), company.getCompanyDB());
		if (company.connect() != 0) {
			int code = company.getLastErrorCode();
			String description = company.getLastErrorDescription();
			try {
				company.release();
			} catch (Throwable ex) {
				// 忽略释放异常
			}
			throw new B1Exception(String.format("%s - %s", code, description));
		} else {
			Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_CONNECTED, company.getServer(), company.getCompanyDB());
		}
		return company;
	}

	/** 池锁，替代synchronized以支持Condition等待/通知 */
	private final Lock poolLock = new ReentrantLock(true);
	/** 池非空条件，recycling时signal，obtain等待时await */
	private final Condition notEmpty = poolLock.newCondition();

	/** 池中空闲连接 */
	private B1CompanyWrapping[] wrappings = null;

	/** 上次清理时间 */
	private volatile long lastEvictTime = 0;

	/**
	 * 从连接池获取一个可用的B1公司连接
	 * <p>
	 * 如果连接池中有匹配的连接则返回，否则创建新连接。
	 * 支持连接等待机制和空闲连接清理。
	 *
	 * @param connection B1连接配置信息
	 * @return B1公司连接对象
	 * @throws B1Exception 连接获取失败时抛出
	 */
	public ICompany obtain(IB1Connection connection) throws B1Exception {
		if (connection == null) {
			return null;
		}
		if (POOL_SIZE <= 0) {
			return this.createCompany(connection);
		}
		poolLock.lock();
		try {
			// 懒初始化池
			if (this.wrappings == null) {
				this.wrappings = new B1CompanyWrapping[POOL_SIZE];
			}
			// 尝试从池中获取匹配的连接
			for (int count = 0; count < RETRY_COUNT; count++) {
				this.evictIdleConnections();
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
						// 检查连接是否有效
						if (!company.isConnected()) {
							this.wrappings[i] = null;
							this.safeRelease(company);
							continue;
						}
						// 匹配检查（防止NPE）
						if (!equalsIgnoreCaseSafe(company.getServer(), connection.getServer())) {
							continue;
						}
						if (!equalsIgnoreCaseSafe(company.getCompanyDB(), connection.getCompanyDB())) {
							continue;
						}
						if (!equalsIgnoreCaseSafe(company.getUserName(), connection.getUserName())) {
							continue;
						}
						Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_DATATIME, connection.getServer(),
								connection.getCompanyDB(), B1DataConvert.toString(company.getDBServerDate()),
								company.getDBServerTime());
						this.wrappings[i] = null;
						return company;
					} catch (ComException | Error e) {
						this.wrappings[i] = null;
						this.safeRelease(company);
						Logger.log(MessageLevel.ERROR, e.toString());
					}
				}
				// 池中无可用连接，等待（释放锁，允许recycling归还）
				Logger.log(MessageLevel.DEBUG, MSG_B1_COMPANY_WAITING, connection.getServer(),
						connection.getCompanyDB());
				try {
					notEmpty.await(WAITING_TIME, TimeUnit.MILLISECONDS);
				} catch (InterruptedException e) {
					Thread.currentThread().interrupt();
					break;
				}
			}
		} finally {
			poolLock.unlock();
		}
		// 池中无可用连接，创建新连接
		return this.createCompany(connection);
	}

	/**
	 * 将B1公司连接回收至连接池
	 * <p>
	 * 验证连接有效性后放回池中供后续使用。
	 * 如果池已满或连接无效，则不会回收。
	 *
	 * @param company 要回收的B1公司连接对象
	 * @return true表示回收成功，false表示回收失败
	 */
	public boolean recycling(ICompany company) {
		if (company == null) {
			return false;
		}
		if (POOL_SIZE <= 0) {
			return false;
		}
		poolLock.lock();
		try {
			if (this.wrappings == null) {
				this.wrappings = new B1CompanyWrapping[POOL_SIZE];
			}
			// 验证连接有效性，无效连接不放回池中
			try {
				if (!company.isConnected()) {
					this.safeRelease(company);
					return false;
				}
			} catch (ComException | Error e) {
				this.safeRelease(company);
				return false;
			}
			for (int i = 0; i < this.wrappings.length; i++) {
				if (this.wrappings[i] != null) {
					continue;
				}
				this.wrappings[i] = new B1CompanyWrapping(company);
				notEmpty.signal();
				Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_RECYCLED, company.getServer(), company.getCompanyDB());
				return true;
			}
		} finally {
			poolLock.unlock();
		}
		// 池已满，无法回收
		return false;
	}

	/**
	 * 清理空闲超时的连接
	 */
	private void evictIdleConnections() {
		// 调用者已持有poolLock
		long now = System.currentTimeMillis();
		if (now - lastEvictTime < EVICT_INTERVAL) {
			return;
		}
		lastEvictTime = now;
		if (this.wrappings == null) {
			return;
		}
		for (int i = 0; i < this.wrappings.length; i++) {
			B1CompanyWrapping wrapping = this.wrappings[i];
			if (wrapping == null) {
				continue;
			}
			if (IDLE_TIMEOUT > 0 && (now - wrapping.getStowedTime()) > IDLE_TIMEOUT) {
				ICompany company = wrapping.getCompany();
				this.wrappings[i] = null;
				if (company != null) {
					String server = null;
					String companyDB = null;
					try {
						server = company.getServer();
						companyDB = company.getCompanyDB();
					} catch (ComException | Error e) {
						// 获取信息失败
					}
					this.safeRelease(company);
					Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_EVICTED, server, companyDB);
				}
			}
		}
	}

	/**
	 * 安全释放COM连接
	 */
	private void safeRelease(ICompany company) {
		if (company == null) {
			return;
		}
		try {
			company.release();
		} catch (Throwable ex) {
			// 忽略释放异常
		}
	}

	/**
	 * 安全的equalsIgnoreCase，防止NPE
	 */
	private static boolean equalsIgnoreCaseSafe(String a, String b) {
		if (a == null) {
			return b == null;
		}
		return a.equalsIgnoreCase(b);
	}

	/**
	 * B1公司连接包装类，用于跟踪连接的存储时间
	 */
	protected class B1CompanyWrapping {
		/**
		 * 构造函数
		 *
		 * @param company B1公司连接对象
		 */
		public B1CompanyWrapping(ICompany company) {
			this.setCompany(company);
		}

		ICompany company;

		/**
		 * 获取B1公司连接对象
		 *
		 * @return B1公司连接对象
		 */
		public ICompany getCompany() {
			return this.company;
		}

		/**
		 * 设置B1公司连接对象，并更新存储时间
		 *
		 * @param connection B1公司连接对象
		 */
		public void setCompany(ICompany connection) {
			this.company = connection;
			if (this.company != null)
				this.setStowedTime(System.currentTimeMillis());
			else
				this.setStowedTime(-1);
		}

		long stowedTime;

		/**
		 * 获取连接存储时间（毫秒时间戳）
		 *
		 * @return 存储时间戳
		 */
		public long getStowedTime() {
			return stowedTime;
		}

		/**
		 * 设置连接存储时间（毫秒时间戳）
		 *
		 * @param stowedTime 存储时间戳
		 */
		public void setStowedTime(long stowedTime) {
			this.stowedTime = stowedTime;
		}

	}
}
