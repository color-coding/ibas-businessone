package org.colorcoding.tools.btulz.businessone.transformer;

import org.colorcoding.ibas.bobas.businessone.db.B1CompanyPool;
import org.colorcoding.ibas.bobas.businessone.db.IB1Connection;
import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.model.Domain;
import org.colorcoding.tools.btulz.businessone.model.Model;
import org.colorcoding.tools.btulz.businessone.model.Property;
import org.colorcoding.tools.btulz.businessone.model.ValidValue;
import org.colorcoding.tools.btulz.model.data.emDataSubType;
import org.colorcoding.tools.btulz.model.data.emDataType;
import org.colorcoding.tools.btulz.model.data.emModelType;
import org.colorcoding.tools.btulz.transformer.Transformer;
import org.colorcoding.tools.btulz.util.ArrayList;
import org.colorcoding.tools.btulz.util.List;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IField;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.IUserTable;
import com.sap.smb.sbo.api.IValidValue;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class OutTransformer extends Transformer implements IB1Connection {

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
		return language;
	}

	public void setLanguage(int language) {
		this.language = language;
	}

	private String licenseServer;

	public String getLicenseServer() {
		return licenseServer;
	}

	public void setLicenseServer(String licenseServer) {
		this.licenseServer = licenseServer;
	}

	private String sldServer;

	public String getSLDServer() {
		return sldServer;
	}

	public void setSLDServer(String sldServer) {
		this.sldServer = sldServer;
	}

	private int dbServerType;

	public int getDbServerType() {
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

	private String outputFolder;

	public String getOutputFolder() {
		return outputFolder;
	}

	public void setOutputFolder(String outputFolder) {
		this.outputFolder = outputFolder;
	}

	@Override
	public void transform() throws Exception {
		ICompany b1Company = B1CompanyPool.use(this);
		try {
			long startTime = System.currentTimeMillis();
			Environment.getLogger().info(String.format("begin output company data."));
			Domain domain = new Domain();
			domain.setName(b1Company.getCompanyDB());
			domain.setDescription(b1Company.getCompanyName());
			Model model;
			Property property;
			ValidValue validValue;
			// 获取B1自定义表
			IUserTable userTable;
			IField userField;
			IValidValue userValidValue;
			Environment.getLogger().info(String.format("begin output user tables & fields."));
			for (int i = 0; i < b1Company.getUserTables().getCount() - 1; i++) {
				userTable = b1Company.getUserTables().item(i);
				Environment.getLogger().info(String.format("output table [%s - %s]", userTable.getTableName(),
						userTable.getTableDescription()));
				model = new Model();
				model.setSystem(false);
				model.setName(userTable.getTableName());
				model.setDescription(userTable.getTableDescription());
				model.setModelType(this.emModelTypeOf(b1Company, model.getName()));
				for (int j = 0; j < userTable.getUserFields().getFields().getCount() - 1; j++) {
					userField = userTable.getUserFields().getFields().item(j);
					property = new Property();
					property.setName(userField.getName().substring(2));
					property.setDescription(userField.getDescription());
					property.setDataType(this.emDataTypeOf(userField.getType()));
					property.setDataSubType(this.emDataSubTypeOf(userField.getSubType()));
					property.setEditSize(userField.getSize());
					property.setLinked(userField.getLinkedTable());
					for (int k = 0; k < userField.getValidValues().getCount() - 1; k++) {
						userValidValue = userField.getValidValues().item(k);
						validValue = new ValidValue();
						validValue.setValue(userValidValue.getValue());
						validValue.setDescription(userValidValue.getDescription());
						property.getValidValues().add(validValue);
					}
					model.getProperties().add(property);
				}
				domain.getModels().add(model);
			}
			Environment.getLogger().info(String.format("begin output system fields."));
			// 获取B1系统表
			IRecordset rsField = SBOCOMUtil.newRecordset(b1Company);
			IRecordset rsVaildValue = SBOCOMUtil.newRecordset(b1Company);
			rsField.doQuery("SELECT * FROM \"CUFD\" WHERE \"TableID\" NOT LIKE '@%'");
			while (!rsField.isEoF()) {
				model = (Model) domain.getModels().firstOrDefault(c -> c.getName()
						.equalsIgnoreCase(String.valueOf(rsField.getFields().item("TableID").getValue())));
				if (model == null) {
					model = new Model();
					model.setSystem(true);
					model.setName(rsField.getFields().item("TableID").getValueString());
					model.setDescription("System Table");
					model.setModelType(this.emModelTypeOf(-1));
					domain.getModels().add(model);
					Environment.getLogger().info(String.format("output system table [%s]'s fields.",
							rsField.getFields().item("TableID").getValueString()));
				}
				property = new Property();
				property.setName(rsField.getFields().item("AliasID").getValueString());
				property.setDescription(rsField.getFields().item("Descr").getValueString());
				property.setDataType(this.emDataTypeOf(rsField.getFields().item("TypeID").getValueString()));
				property.setDataSubType(this.emDataSubTypeOf(rsField.getFields().item("EditType").getValueString()));
				property.setEditSize(rsField.getFields().item("EditSize").getValueInteger());
				property.setDefaultValue(rsField.getFields().item("Dflt").getValueString());
				// 获取字段可选值
				rsVaildValue.doQuery(String.format(
						"SELECT * FROM \"UFD1\" WHERE \"TableID\" = '%s' AND \"FieldID\" = '%s' ORDER BY \"IndexID\"",
						rsField.getFields().item("TableID").getValue(),
						rsField.getFields().item("FieldID").getValue()));
				while (!rsVaildValue.isEoF()) {
					validValue = new ValidValue();
					validValue.setValue(rsVaildValue.getFields().item("FldValue").getValueString());
					validValue.setDescription(rsVaildValue.getFields().item("Descr").getValueString());
					property.getValidValues().add(validValue);
					rsVaildValue.moveNext();
				}
				model.getProperties().add(property);
				rsField.moveNext();
			}
			this.getDomains().add(domain);
			// 模型写入文件
			Environment.getLogger().info(String.format("write domain models to files [%s].", this.getOutputFolder()));
			XmlTransformer xmlTransformer = new XmlTransformer();
			xmlTransformer.setGroupingFile(false);
			for (Domain item : this.getDomains()) {
				xmlTransformer.load(item);
			}
			xmlTransformer.save(this.getOutputFolder());

			long endTime = System.currentTimeMillis();
			float excTime = (float) (endTime - startTime) / 1000;
			Environment.getLogger().info(String.format("end output company data, used %s second.", excTime));
		} finally {
			b1Company.disconnect();
			b1Company.release();
			SBOCOMUtil.release();
			System.gc();
		}
	}

	protected emModelType emModelTypeOf(Integer value) {
		if (Integer.compare(value, SBOCOMConstants.BoUTBTableType_bott_Document) == 0) {
			return emModelType.Document;
		} else if (Integer.compare(value, SBOCOMConstants.BoUTBTableType_bott_DocumentLines) == 0) {
			return emModelType.DocumentLine;
		} else if (Integer.compare(value, SBOCOMConstants.BoUTBTableType_bott_MasterData) == 0) {
			return emModelType.MasterData;
		} else if (Integer.compare(value, SBOCOMConstants.BoUTBTableType_bott_MasterDataLines) == 0) {
			return emModelType.MasterDataLine;
		} else {
			return emModelType.Unspecified;
		}
	}

	protected emModelType emModelTypeOf(ICompany b1Company, String value) throws SBOCOMException {
		IRecordset recordset = SBOCOMUtil.newRecordset(b1Company);
		recordset.doQuery(String.format("SELECT \"ObjectType\" FROM \"OUTB\" WHERE \"TableName\" = '%s'", value));
		while (!recordset.isEoF()) {
			return emModelTypeOf(Integer.valueOf(recordset.getFields().item(0).getValueString()));
		}
		return this.emModelTypeOf(-1);
	}

	protected emDataType emDataTypeOf(Integer value) {
		if (Integer.compare(value, SBOCOMConstants.BoFieldTypes_db_Float) == 0) {
			return emDataType.Decimal;
		} else if (Integer.compare(value, SBOCOMConstants.BoFieldTypes_db_Date) == 0) {
			return emDataType.Date;
		} else if (Integer.compare(value, SBOCOMConstants.BoFieldTypes_db_Numeric) == 0) {
			return emDataType.Numeric;
		} else if (Integer.compare(value, SBOCOMConstants.BoFieldTypes_db_Memo) == 0) {
			return emDataType.Memo;
		} else {
			return emDataType.Alphanumeric;
		}
	}

	protected emDataType emDataTypeOf(String value) {
		if ("B".equals(value)) {
			return emDataType.Decimal;
		} else if ("D".equals(value)) {
			return emDataType.Date;
		} else if ("N".equals(value)) {
			return emDataType.Numeric;
		} else if ("R".equals(value)) {
			return emDataType.Memo;
		} else {
			return emDataType.Alphanumeric;
		}
	}

	protected emDataSubType emDataSubTypeOf(Integer value) {
		if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Address) == 0) {
			return emDataSubType.Address;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Image) == 0) {
			return emDataSubType.Image;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Link) == 0) {
			return emDataSubType.Link;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Measurement) == 0) {
			return emDataSubType.Measurement;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Percentage) == 0) {
			return emDataSubType.Percentage;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Phone) == 0) {
			return emDataSubType.Phone;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Price) == 0) {
			return emDataSubType.Price;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Quantity) == 0) {
			return emDataSubType.Quantity;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Rate) == 0) {
			return emDataSubType.Rate;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Sum) == 0) {
			return emDataSubType.Sum;
		} else if (Integer.compare(value, SBOCOMConstants.BoFldSubTypes_st_Time) == 0) {
			return emDataSubType.Time;
		}
		return emDataSubType.Default;
	}

	protected emDataSubType emDataSubTypeOf(String value) {
		if ("?".equals(value)) {
			return emDataSubType.Address;
		} else if ("I".equals(value)) {
			return emDataSubType.Image;
		} else if ("B".equals(value)) {
			return emDataSubType.Link;
		} else if ("M".equals(value)) {
			return emDataSubType.Measurement;
		} else if ("%".equals(value)) {
			return emDataSubType.Percentage;
		} else if ("#".equals(value)) {
			return emDataSubType.Phone;
		} else if ("P".equals(value)) {
			return emDataSubType.Price;
		} else if ("Q".equals(value)) {
			return emDataSubType.Quantity;
		} else if ("R".equals(value)) {
			return emDataSubType.Rate;
		} else if ("S".equals(value)) {
			return emDataSubType.Sum;
		} else if ("T".equals(value)) {
			return emDataSubType.Time;
		}
		return emDataSubType.Default;
	}
}
