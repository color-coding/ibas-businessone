package org.colorcoding.ibas.bobas.businessone.repository;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.businessone.db.B1Adapter;
import org.colorcoding.ibas.bobas.businessone.db.B1CompanyPool;
import org.colorcoding.ibas.bobas.businessone.db.IB1Adapter;
import org.colorcoding.ibas.bobas.businessone.db.IB1Connection;
import org.colorcoding.ibas.bobas.businessone.serialization.B1SerializerFactory;
import org.colorcoding.ibas.bobas.businessone.serialization.IB1Serializer;
import org.colorcoding.ibas.bobas.businessone.serialization.IB1SerializerManager;
import org.colorcoding.ibas.bobas.common.ISqlQuery;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class BORepositoryBusinessOne implements IB1Connection {

	public BORepositoryBusinessOne() {
		this.setServer(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_SERVER));
		this.setCompanyDB(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_COMPANY));
		this.setUserName(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_USER));
		this.setPassword(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_PASSWORD));
		this.setDbServerType(Enumeration.valueOf("BoDataServerTypes",
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_TYPE)));
		this.setDbUserName(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_USER));
		this.setDbPassword(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_PASSWORD));
		this.setUseTrusted(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_USE_TRUSTED, false));
		this.setSLDServer(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_SLD_SERVER));
		this.setLicenseServer(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_LICENSE_SERVER));
	}

	private String userToken = null;

	public final String getUserToken() {
		return userToken;
	}

	public final void setUserToken(String userToken) throws InvalidTokenException {
		String token = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_TOKEN);
		if (token != null && !token.isEmpty()) {
			if (!token.equals(userToken)) {
				throw new InvalidTokenException();
			}
		}
		this.userToken = userToken;
	}

	private String server;

	public final String getServer() {
		return server;
	}

	public final void setServer(String server) {
		this.server = server;
	}

	private String companyDB;

	public final String getCompanyDB() {
		return companyDB;
	}

	public final void setCompanyDB(String companyDB) {
		this.companyDB = companyDB;
	}

	private String userName;

	public final String getUserName() {
		return userName;
	}

	public final void setUserName(String userName) {
		this.userName = userName;
	}

	private String password;

	public final String getPassword() {
		return password;
	}

	public final void setPassword(String password) {
		this.password = password;
	}

	private int language;

	public final int getLanguage() {
		return language;
	}

	public final void setLanguage(int language) {
		this.language = language;
	}

	private String licenseServer;

	public final String getLicenseServer() {
		return licenseServer;
	}

	public final void setLicenseServer(String licenseServer) {
		this.licenseServer = licenseServer;
	}

	private String sldServer;

	public final String getSLDServer() {
		return sldServer;
	}

	public final void setSLDServer(String sldServer) {
		this.sldServer = sldServer;
	}

	private int dbServerType;

	public final int getDbServerType() {
		return dbServerType;
	}

	public final void setDbServerType(int dbServerType) {
		this.dbServerType = dbServerType;
	}

	private String dbUserName;

	public final String getDbUserName() {
		return dbUserName;
	}

	public final void setDbUserName(String dbUserName) {
		this.dbUserName = dbUserName;
	}

	private String dbPassword;

	public final String getDbPassword() {
		return dbPassword;
	}

	public final void setDbPassword(String dbPassword) {
		this.dbPassword = dbPassword;
	}

	private boolean useTrusted;

	public final boolean isUseTrusted() {
		return useTrusted;
	}

	public final void setUseTrusted(boolean useTrusted) {
		this.useTrusted = useTrusted;
	}

	private volatile ICompany b1Company;

	protected final ICompany getB1Company() throws RepositoryException {
		if (this.b1Company == null) {
			throw new RepositoryException(I18N.prop("msg_please_open_repository_first"));
		}
		return b1Company;
	}

	public final synchronized boolean openRepository() throws RepositoryException {
		try {
			if (this.b1Company != null && !this.b1Company.isConnected()) {
				B1CompanyPool.release(this.b1Company);
			}
			if (this.b1Company == null) {
				this.b1Company = B1CompanyPool.use(this);
				this.b1Adapter = B1Adapter.create(this.b1Company);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			throw new RepositoryException(e);
		}
	}

	public final synchronized void closeRepository() throws RepositoryException {
		this.closeRepository(false);
	}

	public final synchronized void closeRepository(boolean force) throws RepositoryException {
		if (this.b1Company == null) {
			this.b1Adapter = null;
			return;
		}
		if (this.b1Company.isInTransaction()) {
			throw new RepositoryException(I18N.prop("msg_please_end_transaction_first"));
		}
		if (force) {
			B1CompanyPool.release(this.b1Company);
		} else {
			if (!B1CompanyPool.back(this.b1Company)) {
				// 回收失败，释放
				B1CompanyPool.release(this.b1Company);
			}
		}
		this.b1Company = null;
		this.b1Adapter = null;
	}

	public final synchronized boolean inTransaction() throws RepositoryException {
		if (this.b1Company == null) {
			return false;
		}
		return this.getB1Company().isInTransaction();
	}

	public final synchronized boolean beginTransaction() throws RepositoryException {
		if (this.b1Company == null) {
			return false;
		}
		if (!this.getB1Company().isConnected()) {
			return false;
		}
		if (this.getB1Company().isInTransaction()) {
			return false;
		}
		this.getB1Company().startTransaction();
		return true;
	}

	public final synchronized void rollbackTransaction() throws RepositoryException {
		if (this.b1Company == null) {
			return;
		}
		this.getB1Company().endTransaction(SBOCOMConstants.BoWfTransOpt_wf_RollBack);
	}

	public final synchronized void commitTransaction() throws RepositoryException {
		if (this.b1Company == null) {
			return;
		}
		this.getB1Company().endTransaction(SBOCOMConstants.BoWfTransOpt_wf_Commit);
	}

	private IB1Adapter b1Adapter;

	protected final IB1Adapter getB1Adapter() {
		return b1Adapter;
	}

	private String serialization;

	public String getSerialization() {
		if (this.serialization == null || this.serialization.isEmpty()) {
			this.serialization = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_SERIALIZATION_TYPE,
					IB1SerializerManager.TYPE_JSON);
		}
		return serialization;
	}

	public void setSerialization(String serialization) {
		this.b1Serializer = null;
		this.serialization = serialization;
	}

	private IB1Serializer<?> b1Serializer;

	protected IB1Serializer<?> getB1Serializer() throws RepositoryException {
		if (b1Serializer == null) {
			b1Serializer = B1SerializerFactory.create().createManager().create(this.getSerialization());
		}
		return b1Serializer;
	}

	protected static final String MSG_SQL_SCRIPTS = "sql: %s";

	protected final IRecordset query(String sql, Object... args) throws RepositoryException {
		try {
			if (args.length > 0) {
				sql = String.format(sql, args);
			}
			IRecordset recordset = SBOCOMUtil.newRecordset(this.getB1Company());
			if (MyConfiguration.isDebugMode()) {
				Logger.log(MessageLevel.DEBUG, MSG_SQL_SCRIPTS, sql);
			}
			recordset.doQuery(sql);
			return recordset;
		} catch (RepositoryException e) {
			throw e;
		} catch (Exception e) {
			throw new RepositoryException(e);
		}
	}

	protected final IRecordset query(ISqlQuery sqlQuery) throws RepositoryException {
		return this.query(sqlQuery.getQueryString());
	}

}
