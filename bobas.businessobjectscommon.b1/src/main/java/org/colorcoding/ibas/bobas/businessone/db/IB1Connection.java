package org.colorcoding.ibas.bobas.businessone.db;

public interface IB1Connection {
	/**
	 * 服务器地址
	 * 
	 * @return
	 */
	String getServer();

	/**
	 * 连接的公司
	 * 
	 * @return
	 */
	String getCompanyDB();

	/**
	 * 用户
	 * 
	 * @return
	 */
	String getUserName();

	/**
	 * 密码
	 * 
	 * @return
	 */
	String getPassword();

	/**
	 * 语言
	 * 
	 * @return
	 */
	int getLanguage();

	/**
	 * 许可服务
	 * 
	 * @return
	 */
	String getLicenseServer();

	/**
	 * 架构服务
	 * 
	 * @return
	 */
	String getSLDServer();

	/**
	 * 数据库类型
	 * 
	 * @return
	 */
	int getDbServerType();

	/**
	 * 数据库用户
	 * 
	 * @return
	 */
	String getDbUserName();

	/**
	 * 数据库密码
	 * 
	 * @return
	 */
	String getDbPassword();

	/**
	 * 使用信任连接
	 * 
	 * @return
	 */
	boolean isUseTrusted();

}
