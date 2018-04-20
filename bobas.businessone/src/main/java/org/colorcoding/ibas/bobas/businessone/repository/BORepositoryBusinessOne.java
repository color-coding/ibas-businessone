package org.colorcoding.ibas.bobas.businessone.repository;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.businessone.db.B1AdapterFactory;
import org.colorcoding.ibas.bobas.businessone.db.IB1Adapter;
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

	public String getServer() {
		return this.getB1Company().getServer();
	}

	public void setServer(String server) {
		this.getB1Company().setServer(server);
		if (server != null && !server.isEmpty()) {
			this.getB1Company().setLicenseServer(String.format("%s:30000", server));
			this.getB1Company().setSLDServer(String.format("%s:40000", server));
		}
	}

	public String getCompanyDB() {
		return this.getB1Company().getCompanyDB();
	}

	public void setCompanyDB(String companyDB) {
		this.getB1Company().setCompanyDB(companyDB);
	}

	public String getUserName() {
		return this.getB1Company().getUserName();
	}

	public void setUserName(String userName) {
		this.getB1Company().setUserName(userName);
	}

	public String getPassword() {
		return this.getB1Company().getPassword();
	}

	public void setPassword(String password) {
		this.getB1Company().setPassword(password);
	}

	public int getLanguage() {
		return this.getB1Company().getLanguage();
	}

	public void setLanguage(int language) {
		this.getB1Company().setLanguage(language);
	}

	public String getLicenseServer() {
		return this.getB1Company().getLicenseServer();
	}

	public void setLicenseServer(String licenseServer) {
		this.getB1Company().setLicenseServer(licenseServer);
	}

	public String getSLDServer() {
		return this.getB1Company().getSLDServer();
	}

	public void setSLDServer(String sldServer) {
		this.getB1Company().setSLDServer(sldServer);
	}

	public int getDbServerType() {
		return this.getB1Company().getDbServerType();
	}

	public void setDbServerType(int dbServerType) {
		this.getB1Company().setDbServerType(dbServerType);
	}

	public String getDbUserName() {
		return this.getB1Company().getDbUserName();
	}

	public void setDbUserName(String dbUserName) {
		this.getB1Company().setDbUserName(dbUserName);
	}

	public String getDbPassword() {
		return this.getB1Company().getDbPassword();
	}

	public void setDbPassword(String dbPassword) {
		this.getB1Company().setDbPassword(dbPassword);
	}

	public boolean isUseTrusted() {
		return this.getB1Company().isUseTrusted();
	}

	public void setUseTrusted(boolean useTrusted) {
		this.getB1Company().setUseTrusted(useTrusted);
	}

	private ICompany b1Company;

	protected ICompany getB1Company() {
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
		if (!this.b1Company.isConnected()) {
			if (this.b1Company.connect() != 0) {
				throw new RuntimeException(
						this.b1Company.getLastErrorCode() + this.b1Company.getLastErrorDescription());
			}
		}
		this.b1Adapter = B1AdapterFactory.create(this.b1Company);
		return b1Company;
	}

	public void dispose() throws RepositoryException {
		if (this.b1Company != null) {
			this.b1Company.disconnect();
			this.b1Company.release();
			this.b1Adapter = null;
			System.gc();
		}
	}

	public boolean inTransaction() {
		if (this.b1Company == null) {
			return false;
		}
		return this.getB1Company().isInTransaction();
	}

	public boolean beginTransaction() throws RepositoryException {
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

	public void rollbackTransaction() throws RepositoryException {
		if (this.b1Company == null) {
			return;
		}
		this.getB1Company().endTransaction(SBOCOMConstants.BoWfTransOpt_wf_RollBack);
	}

	public void commitTransaction() throws RepositoryException {
		if (this.b1Company == null) {
			return;
		}
		this.getB1Company().endTransaction(SBOCOMConstants.BoWfTransOpt_wf_Commit);
	}

	private IB1Adapter b1Adapter;

	protected IB1Adapter getB1Adapter() {
		return b1Adapter;
	}

	protected static final String MSG_SQL_SCRIPTS = "sql: %s";

	protected IRecordset query(String sql) throws SBOCOMException {
		IRecordset recordset = SBOCOMUtil.newRecordset(this.getB1Company());
		if (MyConfiguration.isDebugMode()) {
			Logger.log(MessageLevel.DEBUG, MSG_SQL_SCRIPTS, sql);
		}
		recordset.doQuery(sql);
		return recordset;
	}

	protected IRecordset query(ISqlQuery sqlQuery) throws SBOCOMException {
		return this.query(sqlQuery.getQueryString());
	}

}
