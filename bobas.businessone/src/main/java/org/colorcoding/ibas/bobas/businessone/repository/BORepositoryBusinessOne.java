package org.colorcoding.ibas.bobas.businessone.repository;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.businessone.db.B1Adapter;
import org.colorcoding.ibas.bobas.businessone.db.IB1Adapter;
import org.colorcoding.ibas.bobas.businessone.serialization.B1SerializerFactory;
import org.colorcoding.ibas.bobas.businessone.serialization.IB1Serializer;
import org.colorcoding.ibas.bobas.businessone.serialization.IB1SerializerManager;
import org.colorcoding.ibas.bobas.common.ISqlQuery;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class BORepositoryBusinessOne {

	protected static final String MSG_B1_COMPANY_CONNECTING = "b1 company: [%s | %s] is connecting.";
	protected static final String MSG_B1_COMPANY_CONNECTED = "b1 company: [%s | %s] was connected.";

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

	public final String getServer() {
		return this.getB1Company().getServer();
	}

	public final void setServer(String server) {
		this.getB1Company().setServer(server);
		if (server != null && !server.isEmpty()) {
			this.getB1Company().setLicenseServer(String.format("%s:30000", server));
			this.getB1Company().setSLDServer(String.format("%s:40000", server));
		}
	}

	public final String getCompanyDB() {
		return this.getB1Company().getCompanyDB();
	}

	public final void setCompanyDB(String companyDB) {
		this.getB1Company().setCompanyDB(companyDB);
	}

	public final String getUserName() {
		return this.getB1Company().getUserName();
	}

	public final void setUserName(String userName) {
		this.getB1Company().setUserName(userName);
	}

	public final String getPassword() {
		return this.getB1Company().getPassword();
	}

	public final void setPassword(String password) {
		this.getB1Company().setPassword(password);
	}

	public final int getLanguage() {
		return this.getB1Company().getLanguage();
	}

	public final void setLanguage(int language) {
		this.getB1Company().setLanguage(language);
	}

	public final String getLicenseServer() {
		return this.getB1Company().getLicenseServer();
	}

	public final void setLicenseServer(String licenseServer) {
		this.getB1Company().setLicenseServer(licenseServer);
	}

	public final String getSLDServer() {
		return this.getB1Company().getSLDServer();
	}

	public final void setSLDServer(String sldServer) {
		this.getB1Company().setSLDServer(sldServer);
	}

	public final int getDbServerType() {
		return this.getB1Company().getDbServerType();
	}

	public final void setDbServerType(int dbServerType) {
		this.getB1Company().setDbServerType(dbServerType);
	}

	public final String getDbUserName() {
		return this.getB1Company().getDbUserName();
	}

	public final void setDbUserName(String dbUserName) {
		this.getB1Company().setDbUserName(dbUserName);
	}

	public final String getDbPassword() {
		return this.getB1Company().getDbPassword();
	}

	public final void setDbPassword(String dbPassword) {
		this.getB1Company().setDbPassword(dbPassword);
	}

	public final boolean isUseTrusted() {
		return this.getB1Company().isUseTrusted();
	}

	public final void setUseTrusted(boolean useTrusted) {
		this.getB1Company().setUseTrusted(useTrusted);
	}

	private volatile ICompany b1Company;

	protected final synchronized ICompany getB1Company() {
		if (this.b1Company == null) {
			this.b1Company = SBOCOMUtil.newCompany();
			this.b1Company.setServer(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_SERVER));
			this.b1Company.setCompanyDB(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_COMPANY));
			this.b1Company.setUserName(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_USER));
			this.b1Company.setPassword(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_PASSWORD));
			this.b1Company
					.setLicenseServer(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_LICENSE_SERVER));
			this.b1Company.setSLDServer(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_SLD_SERVER));
			this.b1Company.setDbServerType(Enumeration.valueOf("BoDataServerTypes",
					MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_TYPE)));
			this.b1Company.setDbUserName(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_USER));
			this.b1Company.setDbPassword(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_PASSWORD));
			this.b1Company.setUseTrusted(
					MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DB_USE_TRUSTED, false));
		}
		return b1Company;
	}

	public final void dispose() throws RepositoryException {
		if (this.b1Company != null) {
			this.b1Company.disconnect();
			this.b1Company.release();
			this.b1Adapter = null;
			System.gc();
		}
	}

	public final synchronized boolean openRepository() throws RepositoryException {
		try {
			if (!this.getB1Company().isConnected()) {
				Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_CONNECTING, this.getServer(), this.getCompanyDB());
				if (this.getB1Company().connect() != 0) {
					throw new RuntimeException(this.getB1Company().getLastErrorCode() + " "
							+ this.getB1Company().getLastErrorDescription());
				}
				Logger.log(MessageLevel.INFO, MSG_B1_COMPANY_CONNECTED, this.getServer(), this.getCompanyDB());
				this.b1Adapter = B1Adapter.create(this.getB1Company());
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			throw new RepositoryException(e);
		}
	}

	public final synchronized void closeRepository() {
		if (this.b1Company != null) {
			if (this.b1Company.isConnected()) {
				this.b1Company.disconnect();
			}
		}
	}

	public final synchronized boolean inTransaction() {
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

	protected static final String MSG_SQL_SCRIPTS = "sql: %s";

	protected final IRecordset query(String sql) throws SBOCOMException {
		IRecordset recordset = SBOCOMUtil.newRecordset(this.getB1Company());
		if (MyConfiguration.isDebugMode()) {
			Logger.log(MessageLevel.DEBUG, MSG_SQL_SCRIPTS, sql);
		}
		recordset.doQuery(sql);
		return recordset;
	}

	protected final IRecordset query(ISqlQuery sqlQuery) throws SBOCOMException {
		return this.query(sqlQuery.getQueryString());
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
		this.serialization = serialization;
	}

	private IB1Serializer<?> b1Serializer;

	protected IB1Serializer<?> getB1Serializer() {
		if (b1Serializer == null) {
			b1Serializer = B1SerializerFactory.create().createManager().create(this.getB1Company(),
					this.getSerialization());
		}
		return b1Serializer;
	}

}
