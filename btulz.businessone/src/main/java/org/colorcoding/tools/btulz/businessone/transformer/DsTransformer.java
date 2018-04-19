package org.colorcoding.tools.btulz.businessone.transformer;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.model.Domain;
import org.colorcoding.tools.btulz.businessone.model.Model;
import org.colorcoding.tools.btulz.businessone.model.Property;
import org.colorcoding.tools.btulz.businessone.model.ValidValue;
import org.colorcoding.tools.btulz.model.IBusinessObject;
import org.colorcoding.tools.btulz.model.IBusinessObjectItem;
import org.colorcoding.tools.btulz.model.IDomain;
import org.colorcoding.tools.btulz.model.data.emDataSubType;
import org.colorcoding.tools.btulz.model.data.emDataType;
import org.colorcoding.tools.btulz.model.data.emModelType;
import org.colorcoding.tools.btulz.transformer.MultiTransformException;
import org.colorcoding.tools.btulz.transformer.TransformException;
import org.colorcoding.tools.btulz.transformer.Transformer;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.IUserFieldsMD;
import com.sap.smb.sbo.api.IUserObjectsMD;
import com.sap.smb.sbo.api.IUserTablesMD;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class DsTransformer extends Transformer {

	public final static String TEMPLATE_USER_TABLE = "@%s";
	public final static String TEMPLATE_USER_FIELD = "U_%s";

	private String server;

	public String getServer() {
		return server;
	}

	public void setServer(String server) {
		this.server = server;
	}

	private String companyDB;

	public String getCompanyDB() {
		return companyDB;
	}

	public void setCompanyDB(String companyDB) {
		this.companyDB = companyDB;
	}

	private String userName;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	private int language;

	public int getLanguage() {
		if (this.language <= 0) {
			this.language = SBOCOMConstants.BoSuppLangs_ln_English;
		}
		return language;
	}

	public void setLanguage(int language) {
		this.language = language;
	}

	private String licenseServer;

	public String getLicenseServer() {
		if (this.licenseServer == null) {
			this.licenseServer = String.format("%s:30000", this.getServer());
		}
		return licenseServer;
	}

	public void setLicenseServer(String licenseServer) {
		this.licenseServer = licenseServer;
	}

	private String sldServer;

	public String getSLDServer() {
		if (this.sldServer == null) {
			this.sldServer = String.format("%s:40000", this.getServer());
		}
		return sldServer;
	}

	public void setSLDServer(String sldServer) {
		this.sldServer = sldServer;
	}

	private int dbServerType;

	public int getDbServerType() {
		if (this.dbServerType <= 0) {
			this.dbServerType = SBOCOMConstants.BoDataServerTypes_dst_MSSQL2014;
		}
		return dbServerType;
	}

	public void setDbServerType(int dbServerType) {
		this.dbServerType = dbServerType;
	}

	private String dbUserName;

	public String getDbUserName() {
		return dbUserName;
	}

	public void setDbUserName(String dbUserName) {
		this.dbUserName = dbUserName;
	}

	private String dbPassword;

	public String getDbPassword() {
		return dbPassword;
	}

	public void setDbPassword(String dbPassword) {
		this.dbPassword = dbPassword;
	}

	private boolean useTrusted;

	public boolean isUseTrusted() {
		return useTrusted;
	}

	public void setUseTrusted(boolean useTrusted) {
		this.useTrusted = useTrusted;
	}

	private List<Domain> domains;

	public List<Domain> getDomains() {
		if (domains == null) {
			domains = new ArrayList<>();
		}
		return domains;
	}

	public void addDomains(String file) throws TransformException, MultiTransformException {
		this.addDomains(new File(file));
	}

	public void addDomains(File file) throws TransformException, MultiTransformException {
		XmlTransformer xmlTransformer = new XmlTransformer();
		xmlTransformer.setInterruptOnError(true);
		xmlTransformer.load(file, false);
		for (IDomain domain : xmlTransformer.getWorkingDomains()) {
			this.getDomains().add((Domain) domain);
		}
	}

	protected ICompany getCompany() throws TransformException {
		ICompany company = SBOCOMUtil.newCompany();
		company.setDbServerType(this.getDbServerType());
		company.setServer(this.getServer());
		company.setCompanyDB(this.getCompanyDB());
		company.setUserName(this.getUserName());
		company.setPassword(this.getPassword());
		company.setUseTrusted(this.isUseTrusted());
		company.setLanguage(this.getLanguage());
		company.setDbUserName(this.getDbUserName());
		company.setDbPassword(this.getDbPassword());
		company.setLicenseServer(this.getLicenseServer());
		company.setSLDServer(this.getSLDServer());

		Environment.getLogger().info(
				String.format("b1 company [%s | %s] is connecting.", company.getServer(), company.getCompanyDB()));
		int error = company.connect();
		if (error != 0) {
			throw new TransformException(
					String.format("%s - %s", company.getLastErrorCode(), company.getLastErrorDescription()));
		} else {
			Environment.getLogger().info(
					String.format("b1 company [%s | %s] was connected.", company.getServer(), company.getCompanyDB()));
		}
		return company;
	}

	public void transform() throws Exception {
		ICompany b1Company = this.getCompany();
		try {
			long startTime = System.currentTimeMillis();
			Environment.getLogger().info(String.format("begin transform data structures."));
			for (Domain domain : this.getDomains()) {
				for (Model model : domain.getModels().ofType()) {
					// 处理表
					Environment.getLogger().info(
							String.format("transform model [%s - %s]", model.getMapped(), model.getDescription()));
					String tableName = model.getMapped();
					if (!model.isSystem()) {
						// 非系统，创建表
						IUserTablesMD userTable = SBOCOMUtil.newUserTablesMD(b1Company);
						if (userTable.getByKey(tableName)) {
							// 表存在
							userTable.setTableDescription(model.getDescription());
							if (userTable.update() != 0) {
								throw new TransformException(String.format("%s - %s", b1Company.getLastErrorCode(),
										b1Company.getLastErrorDescription()));
							}
							userTable.release();
							System.gc();
						} else {
							// 表不存在
							userTable.release();
							System.gc();
							userTable = SBOCOMUtil.newUserTablesMD(b1Company);
							userTable.setTableName(tableName);
							userTable.setTableDescription(model.getDescription());
							userTable.setTableType(this.convert(model.getModelType()));
							if (userTable.add() != 0) {
								throw new TransformException(String.format("%s - %s", b1Company.getLastErrorCode(),
										b1Company.getLastErrorDescription()));
							}
							userTable.release();
							System.gc();
						}
						tableName = String.format(TEMPLATE_USER_TABLE, tableName);
					}
					// 处理字段
					for (Property property : model.getProperties().ofType()) {
						if (property.isSystem()) {
							continue;
						}
						Environment.getLogger().info(String.format("transform property [%s - %s]", property.getMapped(),
								property.getDescription()));
						int fieldId = this.getUserFiledId(b1Company, tableName, property.getMapped());
						if (fieldId < 0) {
							// 字段不存在
							IUserFieldsMD userField = SBOCOMUtil.newUserFieldsMD(b1Company);
							userField.setTableName(tableName);
							userField.setName(property.getMapped());
							userField.setDescription(property.getDescription());
							userField.setType(this.convert(property.getDataType()));
							userField.setSubType(this.convert(property.getDataSubType()));
							userField.setEditSize(property.getEditSize());
							if (property.getDefaultValue() != null && !property.getDefaultValue().isEmpty()) {
								userField.setDefaultValue(property.getDefaultValue());
							}
							// 处理可选值
							for (ValidValue validValue : property.getValidValues()) {
								userField.getValidValues().setValue(validValue.getValue());
								userField.getValidValues().setDescription(validValue.getDescription());
								userField.getValidValues().add();
							}
							if (userField.add() != 0) {
								throw new TransformException(String.format("%s - %s", b1Company.getLastErrorCode(),
										b1Company.getLastErrorDescription()));
							}
							userField.release();
							System.gc();
						} else {
							// 字段存在
							System.gc();
							IUserFieldsMD userField = SBOCOMUtil.newUserFieldsMD(b1Company);
							if (userField.getByKey(tableName, fieldId)) {
								userField.setDescription(property.getDescription());
								userField.setEditSize(property.getEditSize());
								if (property.getDefaultValue() != null && !property.getDefaultValue().isEmpty()) {
									userField.setDefaultValue(property.getDefaultValue());
								}
								// 处理可选值
								for (ValidValue validValue : property.getValidValues()) {
									boolean done = true;
									for (int i = 0; i < userField.getValidValues().getCount(); i++) {
										userField.getValidValues().setCurrentLine(i);
										if (validValue.getValue()
												.equalsIgnoreCase(userField.getValidValues().getValue())) {
											done = false;
										}
									}
									if (done) {
										userField.getValidValues().setValue(validValue.getValue());
										userField.getValidValues().setDescription(validValue.getDescription());
										userField.getValidValues().add();
									}
								}
								if (userField.update() != 0) {
									throw new TransformException(String.format("%s - %s", b1Company.getLastErrorCode(),
											b1Company.getLastErrorDescription()));
								}
								userField.release();
								System.gc();
							}
						}
					}
				}
			}
			for (Domain domain : this.getDomains()) {
				for (IBusinessObject businessObject : domain.getBusinessObjects()) {
					Model model = (Model) domain.getModels()
							.firstOrDefault(c -> c.getName().equals(businessObject.getMappedModel()));
					if (model == null) {
						continue;
					}
					// 处理业务对象
					Environment.getLogger().info(String.format("transform business object [%s - %s]",
							businessObject.getShortName(), model.getDescription()));
					IUserObjectsMD userObject = SBOCOMUtil.newUserObjectsMD(b1Company);
					if (userObject.getByKey(businessObject.getShortName())) {
						// 对象存在
						userObject.setName(model.getDescription());
						// 处理查询列
						for (Property property : model.getProperties().ofType()) {
							if (property.isSystem()) {
								continue;
							}
							if (property.getDataType() == emDataType.Memo
									|| property.getDataType() == emDataType.Bytes) {
								continue;
							}
							boolean done = true;
							for (int i = 0; i < userObject.getFindColumns().getCount(); i++) {
								userObject.getFindColumns().setCurrentLine(i);
								if (String.format(TEMPLATE_USER_FIELD, property.getMapped())
										.equalsIgnoreCase(userObject.getFindColumns().getColumnAlias())) {
									done = false;
								}
							}
							if (done) {
								userObject.getFindColumns()
										.setColumnAlias(String.format(TEMPLATE_USER_FIELD, property.getMapped()));
								userObject.getFindColumns().setColumnDescription(property.getDescription());
								userObject.getFindColumns().add();
							}
						}
						if (userObject.getFindColumns().getCount() > 0) {
							userObject.setCanFind(SBOCOMConstants.BoYesNoEnum_tYES);// 可查询
						}
						// 处理子项，仅第一层
						for (IBusinessObjectItem businessObjectItem : businessObject.getRelatedBOs()) {
							model = (Model) domain.getModels()
									.firstOrDefault(c -> c.getName().equals(businessObjectItem.getMappedModel()));
							if (model == null) {
								continue;
							}
							boolean done = true;
							for (int i = 0; i < userObject.getChildTables().getCount(); i++) {
								userObject.getChildTables().setCurrentLine(i);
								if (model.getMapped().equalsIgnoreCase(userObject.getChildTables().getTableName())) {
									done = false;
								}
							}
							if (done) {
								userObject.getChildTables().setTableName(model.getMapped());
								userObject.getChildTables().add();
							}
						}
						if (userObject.update() != 0) {
							throw new TransformException(String.format("%s - %s", b1Company.getLastErrorCode(),
									b1Company.getLastErrorDescription()));
						}
						userObject.release();
						System.gc();
					} else {
						// 对象不存在
						userObject.release();
						System.gc();
						userObject = SBOCOMUtil.newUserObjectsMD(b1Company);
						userObject.setCode(businessObject.getShortName());
						userObject.setName(model.getDescription());
						userObject.setTableName(model.getMapped());
						userObject.setObjectType(this.convert(model.getModelType()));
						userObject.setCanDelete(SBOCOMConstants.BoYesNoEnum_tYES);// 删除
						userObject.setCanClose(SBOCOMConstants.BoYesNoEnum_tYES);// 关闭
						userObject.setCanCancel(SBOCOMConstants.BoYesNoEnum_tYES);// 取消
						// 处理查询列
						for (Property property : model.getProperties().ofType()) {
							if (property.isSystem()) {
								continue;
							}
							if (property.getDataType() == emDataType.Memo
									|| property.getDataType() == emDataType.Bytes) {
								continue;
							}
							userObject.getFindColumns()
									.setColumnAlias(String.format(TEMPLATE_USER_FIELD, property.getMapped()));
							userObject.getFindColumns().setColumnDescription(property.getDescription());
							userObject.getFindColumns().add();
						}
						if (userObject.getFindColumns().getCount() > 0) {
							userObject.setCanFind(SBOCOMConstants.BoYesNoEnum_tYES);// 可查询
						}
						// 处理子项，仅第一层
						for (IBusinessObjectItem businessObjectItem : businessObject.getRelatedBOs()) {
							model = (Model) domain.getModels()
									.firstOrDefault(c -> c.getName().equals(businessObjectItem.getMappedModel()));
							if (model == null) {
								continue;
							}
							userObject.getChildTables().setTableName(model.getMapped());
							userObject.getChildTables().add();
						}
						if (userObject.add() != 0) {
							throw new TransformException(String.format("%s - %s", b1Company.getLastErrorCode(),
									b1Company.getLastErrorDescription()));
						}
						userObject.release();
						System.gc();
					}
				}
			}
			long endTime = System.currentTimeMillis();
			float excTime = (float) (endTime - startTime) / 1000;
			Environment.getLogger().info(String.format("end transform data structures, used %s second.", excTime));
		} finally {
			b1Company.disconnect();
			b1Company.release();
			SBOCOMUtil.release();
			System.gc();
		}
	}

	public static final String SQL_GET_USER_FIELD_ID = "SELECT \"FieldID\" FROM \"CUFD\" WHERE \"TableID\" = '%s' AND \"AliasID\" = '%s'";

	protected int getUserFiledId(ICompany b1Company, String table, String field) throws SBOCOMException {
		IRecordset recordset = null;
		try {
			recordset = SBOCOMUtil.newRecordset(b1Company);
			recordset.doQuery(String.format(SQL_GET_USER_FIELD_ID, table, field));
			if (recordset.getRecordCount() > 0) {
				return Integer.valueOf(recordset.getFields().item(0).getValue().toString());
			}
			return -1;
		} finally {
			if (recordset != null) {
				recordset.release();
			}
			System.gc();
		}
	}

	protected Integer convert(emModelType value) {
		if (value == emModelType.Document) {
			return SBOCOMConstants.BoUTBTableType_bott_Document;
		} else if (value == emModelType.DocumentLine) {
			return SBOCOMConstants.BoUTBTableType_bott_DocumentLines;
		} else if (value == emModelType.MasterData) {
			return SBOCOMConstants.BoUTBTableType_bott_MasterData;
		} else if (value == emModelType.MasterDataLine) {
			return SBOCOMConstants.BoUTBTableType_bott_MasterDataLines;
		} else {
			return SBOCOMConstants.BoUTBTableType_bott_NoObject;
		}
	}

	protected Integer convert(emDataType value) {
		if (value == emDataType.Decimal) {
			return SBOCOMConstants.BoFieldTypes_db_Float;
		} else if (value == emDataType.Date) {
			return SBOCOMConstants.BoFieldTypes_db_Date;
		} else if (value == emDataType.Numeric) {
			return SBOCOMConstants.BoFieldTypes_db_Numeric;
		} else if (value == emDataType.Memo) {
			return SBOCOMConstants.BoFieldTypes_db_Memo;
		} else {
			return SBOCOMConstants.BoFieldTypes_db_Alpha;
		}
	}

	protected Integer convert(emDataSubType value) {
		if (value == emDataSubType.Address) {
			return SBOCOMConstants.BoFldSubTypes_st_Address;
		} else if (value == emDataSubType.Image) {
			return SBOCOMConstants.BoFldSubTypes_st_Image;
		} else if (value == emDataSubType.Link) {
			return SBOCOMConstants.BoFldSubTypes_st_Link;
		} else if (value == emDataSubType.Measurement) {
			return SBOCOMConstants.BoFldSubTypes_st_Measurement;
		} else if (value == emDataSubType.Percentage) {
			return SBOCOMConstants.BoFldSubTypes_st_Percentage;
		} else if (value == emDataSubType.Phone) {
			return SBOCOMConstants.BoFldSubTypes_st_Phone;
		} else if (value == emDataSubType.Price) {
			return SBOCOMConstants.BoFldSubTypes_st_Price;
		} else if (value == emDataSubType.Quantity) {
			return SBOCOMConstants.BoFldSubTypes_st_Quantity;
		} else if (value == emDataSubType.Rate) {
			return SBOCOMConstants.BoFldSubTypes_st_Rate;
		} else if (value == emDataSubType.Sum) {
			return SBOCOMConstants.BoFldSubTypes_st_Sum;
		} else if (value == emDataSubType.Time) {
			return SBOCOMConstants.BoFldSubTypes_st_Time;
		}
		return SBOCOMConstants.BoFldSubTypes_st_None;
	}
}
