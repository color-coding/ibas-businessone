package org.colorcoding.ibas.bobas.businessone.repository;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class BORepositoryBusinessOne {

	public final static String MASTER_REPOSITORY_SIGN = "Master";

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
		return b1Company;
	}

}
