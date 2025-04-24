package org.colorcoding.ibas.bobas.businessone.db;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.IFieldedObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.IDataTable;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.db.DbAdapter;
import org.colorcoding.ibas.bobas.db.DbFactory;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.db.DbTable;
import org.colorcoding.ibas.bobas.db.MaxValue;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.SBOCOMConstants;

public class B1Adapter extends DbAdapter {

	public static B1Adapter create(ICompany company) throws Exception {
		Integer dbHana = -1;
		try {
			dbHana = (Integer) SBOCOMConstants.class.getField("BoDataServerTypes_dst_HANADB")
					.get(SBOCOMConstants.class);
			if (dbHana != -1 && company.getDbServerType() == dbHana) {
				return new B1Adapter(company, DbFactory.create().createAdapter("HANA"));
			}
		} catch (Exception e) {
		}
		return new B1Adapter(company, DbFactory.create().createAdapter("MSSQL"));
	}

	public B1Adapter(ICompany b1Company) {
		this.setB1Company(b1Company);
	}

	public B1Adapter(ICompany b1Company, DbAdapter adapter) {
		this(b1Company);
		this.dbAdapter = adapter;
	}

	private DbAdapter dbAdapter;

	@Override
	public <T> List<T> parsingDatas(Class<?> boType, ResultSet resultSet) throws SQLException {
		return this.dbAdapter.parsingDatas(boType, resultSet);
	}

	@Override
	public <T> T setProperties(T data, ResultSet resultSet, IPropertyInfo<?>[] orderProperties) throws SQLException {
		return this.dbAdapter.setProperties(data, resultSet, orderProperties);
	}

	@Override
	public Object parsingValue(ResultSet resultSet, int columnIndex, Class<?> dataType) throws SQLException {
		return this.dbAdapter.parsingValue(resultSet, columnIndex, dataType);
	}

	@Override
	public IDataTable parsingDatas(ResultSet resultSet) throws SQLException, ClassNotFoundException {
		return this.dbAdapter.parsingDatas(resultSet);
	}

	@Override
	public int sqlTypeOf(DbFieldType type) {
		return this.dbAdapter.sqlTypeOf(type);
	}

	@Override
	public ICriteria convert(ICriteria criteria, Class<?> boType) {
		return this.dbAdapter.convert(criteria, boType);
	}

	@Override
	public ICriteria convert(ICriteria criteria, List<IPropertyInfo<?>> propertyInfos) {
		return this.dbAdapter.convert(criteria, propertyInfos);
	}

	@Override
	public String identifier() {
		return this.dbAdapter.identifier();
	}

	@Override
	public String separation() {
		return this.dbAdapter.separation();
	}

	@Override
	public String where() {
		return this.dbAdapter.where();
	}

	@Override
	public String castAs(DbFieldType type, String alias) {
		return this.dbAdapter.castAs(type, alias);
	}

	@Override
	public String parsing(SortType type) {
		return this.dbAdapter.parsing(type);
	}

	@Override
	public String parsing(ConditionRelationship value) {
		return this.dbAdapter.parsing(value);
	}

	@Override
	public String parsing(ConditionOperation value) {
		return this.dbAdapter.parsing(value);
	}

	@Override
	public String parsingWhere(Iterable<ICondition> conditions) {
		return this.dbAdapter.parsingWhere(conditions);
	}

	@Override
	public String parsingOrder(Iterable<ISort> sorts) {
		return this.dbAdapter.parsingOrder(sorts);
	}

	@Override
	public String parsingWhere(IFieldedObject boData) {
		return this.dbAdapter.parsingWhere(boData);
	}

	@Override
	public String parsingDelete(IFieldedObject boData) {
		return this.dbAdapter.parsingDelete(boData);
	}

	@Override
	public String parsingUpdate(IFieldedObject boData) {
		return this.dbAdapter.parsingUpdate(boData);
	}

	@Override
	public String parsingInsert(IFieldedObject boData) {
		return this.dbAdapter.parsingInsert(boData);
	}

	@Override
	public String parsingStoredProcedure(String spName, String... args) {
		return this.dbAdapter.parsingStoredProcedure(spName, args);
	}

	@Override
	public String parsingMaxValue(MaxValue maxValue, Iterable<ICondition> conditions) {
		return this.dbAdapter.parsingMaxValue(maxValue, conditions);
	}

	@Override
	public Connection createConnection(String server, String dbName, String userName, String userPwd) {
		return this.dbAdapter.createConnection(server, dbName, userName, userPwd);
	}

	private ICompany b1Company;

	protected ICompany getB1Company() {
		if (this.b1Company == null) {
			throw new SerializationException(I18N.prop("msg_b1_invalid_company"));
		}
		return b1Company;
	}

	private void setB1Company(ICompany b1Company) {
		this.b1Company = b1Company;
	}

	@Override
	public String table(Class<?> boType) {
		try {
			return this.getMasterTable(Enumeration.valueOf(boType));
		} catch (SAXException | IOException | ParserConfigurationException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public String parsingSelect(Class<?> boType, ICriteria criteria, boolean withLock) {
		if (boType.getName().startsWith("com.sap.smb.sbo.")) {
			return this.parsingSelect(criteria, this.table(boType));
		}
		return this.dbAdapter.parsingSelect(boType, criteria, withLock);
	}

	public String parsingSelect(ICriteria criteria, String table) {
		String sqlString = this.dbAdapter.parsingSelect(TableProxy$999.class, criteria, false);
		if (!Strings.isNullOrEmpty(sqlString)) {
			sqlString = sqlString.replace(TableProxy$999.DB_TABLE_NAME, table);
			if (criteria != null && !criteria.getConditions().isEmpty()) {
				StringBuilder stringBuilder = new StringBuilder();
				Iterator<ICondition> iterator = criteria.getConditions()
						.where(c -> !Strings.isNullOrEmpty(c.getValue())).iterator();
				for (char item : sqlString.toCharArray()) {
					if (item == '?' && iterator.hasNext()) {
						ICondition condition = iterator.next();
						stringBuilder.append("'");
						stringBuilder.append(condition.getValue());
						stringBuilder.append("'");
					} else {
						stringBuilder.append(item);
					}
				}
				return stringBuilder.toString();
			}
		}
		return sqlString;
	}

	public String parsingSelect(ICriteria criteria, Integer boCode) {
		try {
			String table = this.getMasterTable(boCode);
			if (table == null || table.isEmpty()) {
				throw new RuntimeException(I18N.prop("msg_bobas_not_found_bo_table", boCode));
			}
			return this.parsingSelect(criteria, table);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private Map<Integer, String> tableMap = new HashMap<>();

	protected String getMasterTable(Integer boCode) throws SAXException, IOException, ParserConfigurationException {
		String table = this.tableMap.get(boCode);
		if (table != null) {
			return table;
		}
		table = this.getMasterTable(newDocument(this.getB1Company().getBusinessObjectXmlSchema(boCode)));
		if (table != null) {
			this.tableMap.put(boCode, table);
		}
		return table;
	}

	protected Document newDocument(String xmlData) throws SAXException, IOException, ParserConfigurationException {
		try (InputStream stream = new ByteArrayInputStream(xmlData.getBytes("utf-8"))) {
			return this.newDocument(stream);
		}
	}

	protected Document newDocument(InputStream stream) throws SAXException, IOException, ParserConfigurationException {
		InputSource source = new InputSource(stream);
		source.setEncoding(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DATA_ENCODING, "utf-8"));
		return this.newDocument(source);
	}

	protected Document newDocument(InputSource source) throws SAXException, IOException, ParserConfigurationException {
		return DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(source);
	}

	protected String getMasterTable(Document document) throws SAXException, IOException, ParserConfigurationException {
		Node node = document.getFirstChild();// schema
		node = node.getFirstChild();// element name="BOM"
		node = node.getFirstChild();// complexType
		node = node.getFirstChild();// sequence
		node = node.getFirstChild();// element name="BO"
		node = node.getFirstChild();// complexType
		node = node.getFirstChild();// all
		NodeList nodes = node.getChildNodes();
		for (int i = 0; i < nodes.getLength(); i++) {
			node = nodes.item(i);
			if (node.getNodeName().equals("element")) {
				Node attrib = node.getAttributes().getNamedItem("name");
				if (attrib == null) {
					continue;
				}
				if (attrib.getNodeValue() == null) {
					continue;
				}
				if (attrib.getNodeValue().equals("AdmInfo")) {
					continue;
				}
				if (attrib.getNodeValue().equals("QueryParams")) {
					continue;
				}
				// 第一个表，主表
				return attrib.getNodeValue();
			}
		}
		return null;
	}

	@DbTable(name = TableProxy$999.DB_TABLE_NAME)
	private class TableProxy$999 extends BusinessObject<TableProxy$999> {

		private static final long serialVersionUID = 1L;

		public final static String DB_TABLE_NAME = "${TABLE_NAME}";

	}
}
