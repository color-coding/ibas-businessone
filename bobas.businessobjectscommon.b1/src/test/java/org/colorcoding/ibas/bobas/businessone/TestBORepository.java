package org.colorcoding.ibas.bobas.businessone;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.colorcoding.ibas.bobas.businessone.data.B1DataConvert;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.serialization.B1SerializerJson;
import org.colorcoding.ibas.bobas.businessone.serialization.B1SerializerXml;
import org.colorcoding.ibas.bobas.businessone.serialization.IB1Serializer;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDocuments;
import com.sap.smb.sbo.api.IItems;
import com.sap.smb.sbo.api.IJournalEntries;
import com.sap.smb.sbo.api.IPayments;
import com.sap.smb.sbo.api.IProductionOrders;
import com.sap.smb.sbo.api.IProject;
import com.sap.smb.sbo.api.IProjectsService;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.IUserTable;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

import junit.framework.TestCase;

public class TestBORepository extends TestCase {

	public String getToken() {
		return "";
	}

	private void saveFile(String fileName, String data) throws IOException {
		ByteArrayInputStream stream = new ByteArrayInputStream(data.getBytes());
		OutputStream os = new FileOutputStream(fileName);
		int bytesRead = 0;
		byte[] buffer = new byte[8192];
		while ((bytesRead = stream.read(buffer, 0, 8192)) != -1) {
			os.write(buffer, 0, bytesRead);
		}
		os.close();
		stream.close();
	}

	public void testB1Data() throws SBOCOMException, IOException, RepositoryException {
		BORepositoryDemo boRepository = new BORepositoryDemo();
		boRepository.openRepository();
		ICompany b1Company = boRepository.getCompany();
		String fileGroup = MyConfiguration.getWorkFolder() + File.separator + "recordset_";
		this.saveFile(fileGroup + "schema.xml",
				b1Company.getBusinessObjectXmlSchema(SBOCOMConstants.BoObjectTypes_BoRecordset));
		System.out.println("schema: " + fileGroup + "schema.xml");
		IRecordset recordset = SBOCOMUtil.newRecordset(b1Company);
		recordset.doQuery("Select top 10 * from OITM");
		recordset.saveXML(fileGroup + "data.xml");
		System.out.println("data: " + fileGroup + "data.xml");
		DataTable dataTable = B1DataConvert.toDataTable(recordset);
		System.out.println("dataTable: cloum " + dataTable.getColumns().size() + " row " + dataTable.getRows().size());

		fileGroup = MyConfiguration.getWorkFolder() + File.separator + "items_";
		IItems item = SBOCOMUtil.getItems(b1Company, String.valueOf(recordset.getFields().item("ItemCode").getValue()));
		item.saveXML(fileGroup + "data.xml");
		System.out.println("data: " + fileGroup + "data.xml");
		this.saveFile(fileGroup + "schema_b1.xml",
				b1Company.getBusinessObjectXmlSchema(SBOCOMConstants.BoObjectTypes_oItems));
		System.out.println("schema: " + fileGroup + "schema_b1.xml");

		fileGroup = MyConfiguration.getWorkFolder() + File.separator + "journalentries_";
		IJournalEntries journalEntries = SBOCOMUtil.getJournalEntries(b1Company, 2000);
		journalEntries.saveXML(fileGroup + "data.xml");
		System.out.println("data: " + fileGroup + "data.xml");
		this.saveFile(fileGroup + "schema_b1.xml",
				b1Company.getBusinessObjectXmlSchema(SBOCOMConstants.BoObjectTypes_oJournalEntries));
		System.out.println("schema: " + fileGroup + "schema_b1.xml");

		// xml序列化测试
		fileGroup = MyConfiguration.getWorkFolder() + File.separator + "items_";
		IB1Serializer<?> serializerXml = new B1SerializerXml();
		FileOutputStream outputStream = new FileOutputStream(fileGroup + "schema_xml.xml");
		serializerXml.getSchema(IItems.class, outputStream);
		outputStream.close();
		System.out.println("schema: " + fileGroup + "schema_xml.xml");
		boRepository.closeRepository();
		// json序列化测试
		IB1Serializer<?> serializerJson = new B1SerializerJson();
		outputStream = new FileOutputStream(fileGroup + "schema_json.json");
		serializerJson.getSchema(IItems.class, outputStream);
		outputStream.close();
		System.out.println("schema: " + fileGroup + "schema_json.json");
		fileGroup = MyConfiguration.getWorkFolder() + File.separator + "documents_";
		outputStream = new FileOutputStream(fileGroup + "schema_json.json");
		serializerJson.getSchema(IDocuments.class, outputStream);
		outputStream.close();
		System.out.println("schema: " + fileGroup + "schema_json.json");
		IDocuments order = SBOCOMUtil.getDocuments(b1Company, SBOCOMConstants.BoObjectTypes_Document_oOrders, 1);
		outputStream = new FileOutputStream(fileGroup + "data_json.json");
		serializerJson.serialize(order, outputStream);
		outputStream.close();
		System.out.println("data: " + fileGroup + "data_json.json");
	}

	public void testQuery() throws RepositoryException, SBOCOMException {
		BORepositoryDemo boRepository = new BORepositoryDemo();
		boRepository.openRepository();
		ICompany b1Company = boRepository.getCompany();
		IRecordset recordset = SBOCOMUtil.newRecordset(b1Company);
		recordset.doQuery("Select * from OQCN");
		while (!recordset.isEoF()) {
			System.out.print("Group: ");
			System.out.print(recordset.getFields().item("CategoryId").getValue());
			System.out.print(" ");
			System.out.print(recordset.getFields().item("CatName").getValue());
			System.out.println();
			recordset.moveNext();
		}
		recordset.doQuery("Select * from OUQR");
		while (!recordset.isEoF()) {
			System.out.print("Query: ");
			System.out.print(recordset.getFields().item("IntrnalKey").getValue());
			System.out.print(" ");
			System.out.print(recordset.getFields().item("QCategory").getValue());
			System.out.print(" ");
			System.out.print(recordset.getFields().item("QName").getValue());
			System.out.print(" ");
			System.out.print(recordset.getFields().item("QString").getValue());
			System.out.println();
			recordset.moveNext();
		}
	}

	public void testFetch() throws IOException, ValidateException, RepositoryException {
		String fileGroup = MyConfiguration.getWorkFolder() + File.separator;
		ICriteria criteria = new Criteria();
		criteria.setResultCount(1);
		ICondition condition = criteria.getConditions().create();
		condition.setAlias("ItemCode");
		condition.setOperation(ConditionOperation.NOT_EQUAL);
		condition.setValue("A");
		ISort sort = criteria.getSorts().create();
		sort.setAlias("ItemCode");
		sort.setSortType(SortType.ASCENDING);
		BORepositoryDemo boRepository = new BORepositoryDemo();
		boRepository.setSerialization("xml");
		B1SerializerXml serializerXml = new B1SerializerXml();
		IOperationResult<DataWrapping> operationResult = boRepository.fetchItems(criteria, this.getToken());
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		System.out.println("xml item:");
		for (int i = 0; i < operationResult.getResultObjects().size(); i++) {
			DataWrapping data = operationResult.getResultObjects().get(i);
			this.saveFile(String.format("%sitems_data_%s.xml", fileGroup, i), data.getContent());
			System.out.println(String.format("data: %sitems_data_%s.xml", fileGroup, i));
			serializerXml.validate(IItems.class, data.getContent());
		}
		criteria = new Criteria();
		criteria.setResultCount(1);
		operationResult = boRepository.fetchProductionOrders(criteria, this.getToken());
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		System.out.println("xml production order:");
		for (int i = 0; i < operationResult.getResultObjects().size(); i++) {
			DataWrapping data = operationResult.getResultObjects().get(i);
			this.saveFile(String.format("%sproductionorders_data_%s.xml", fileGroup, i), data.getContent());
			System.out.println(String.format("data: %sproductionorders_data_%s.xml", fileGroup, i));
			serializerXml.validate(IProductionOrders.class, data.getContent());
		}
		boRepository.setSerialization("json");
		B1SerializerJson serializerJson = new B1SerializerJson();
		operationResult = boRepository.fetchItems(criteria, this.getToken());
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		System.out.println("json item:");
		for (int i = 0; i < operationResult.getResultObjects().size(); i++) {
			DataWrapping data = operationResult.getResultObjects().get(i);
			this.saveFile(String.format("%sitems_data_%s.json", fileGroup, i), data.getContent());
			System.out.println(String.format("data: %sitems_data_%s.json", fileGroup, i));
			serializerJson.validate(IItems.class, data.getContent());
		}
		criteria = new Criteria();
		criteria.setResultCount(1);
		operationResult = boRepository.fetchProductionOrders(criteria, this.getToken());
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		System.out.println("json production order:");
		for (int i = 0; i < operationResult.getResultObjects().size(); i++) {
			DataWrapping data = operationResult.getResultObjects().get(i);
			this.saveFile(String.format("%sproductionorders_data_%s.json", fileGroup, i), data.getContent());
			System.out.println(String.format("data: %sproductionorders_data_%s.json", fileGroup, i));
			serializerJson.validate(IProductionOrders.class, data.getContent());
		}
		criteria = new Criteria();
		sort = criteria.getSorts().create();
		sort.setAlias("TransId");
		sort.setSortType(SortType.DESCENDING);
		criteria.setResultCount(1);
		operationResult = boRepository.fetchJournalEntries(criteria, this.getToken());
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		System.out.println("json journal entries:");
		for (int i = 0; i < operationResult.getResultObjects().size(); i++) {
			DataWrapping data = operationResult.getResultObjects().get(i);
			this.saveFile(String.format("%sjournalentries_data_%s.json", fileGroup, i), data.getContent());
			System.out.println(String.format("data: %sjournalentries_data_%s.json", fileGroup, i));
			serializerJson.validate(IJournalEntries.class, data.getContent());
		}
	}

	private static String DATA_STRING_JE = "{\"type\":\"JournalEntries\",\"memo\":\"朱鹏飞报销#10\",\"lines\":[{\"accountCode\":\"540101\",\"debit\":9.9,\"userFields\":{\"fields\":[{\"name\":\"U_FPH\",\"value\":\"H123456789\"},{\"name\":\"U_Date\",\"value\":\"2022-01-01\"},{\"name\":\"U_Qty\",\"value\":9.9}]}},{\"accountCode\":\"100101\",\"credit\":9.9}]}";
	private static String DATA_STRING_SO = "{\"type\":\"Orders\",\"address\":\"100021\\rCN01北京朝阳路\\r1000号6号楼304室\",\"cardCode\":\"C20000\",\"cardName\":\"北京龙发电子贸易公司\",\"docDueDate\":\"2022-01-10\",\"lines\":[{\"itemCode\":\"A00001\",\"itemDescription\":\"IBM Infoprint 1312 喷墨打印机\",\"quantity\":5.0}]}";
	private static String DATA_STRING_UDO = "{\"type\": \"UserTables\",\"tableName\": \"AVA_GP_SETTING\",\"code\": \"A002\",\"name\": \"A002\",\"userFields\": {\"fields\": [{\"name\": \"U_AccCode\",\"value\": 1}]}}";
	private static String DATA_STRING_PRJ = "{\"type\":\"Project\",\"code\":\"P0000002\",\"name\":\"测试项目2\"}";
	private static String DATA_STRING_DIM = "{\"type\":\"ProfitCenter\",\"inWhichDimension\":2,\"centerCode\":\"A00141\",\"centerName\":\"马鹏鹏\"}";
	private static String DATA_STRING_PAY = "{\"type\":\"PaymentsDrafts\",\"docType\":0,\"docObjectCode\":0,\"cardCode\":\"C20000\",\"cardName\":\"北京龙发电子贸易公司\",\"docDate\":\"2022-11-16T00:00:00.000Z\",\"dueDate\":\"2022-11-16T00:00:00.000Z\",\"taxDate\":\"2022-11-16T00:00:00.000Z\",\"remarks\":\"22222222\",\"applyVAT\":1,\"transferAccount\":\"112201\",\"controlAccount\":\"112201\",\"deductionSum\":500,\"docCurrency\":\"CNY\"}";

	public void testB1DataSave()
			throws RepositoryException, SBOCOMException, SerializationException, FileNotFoundException {
		BORepositoryDemo boRepository = new BORepositoryDemo();
		boRepository.openRepository();
		ICompany b1Company = boRepository.getCompany();
		// json序列化测试
		Object data;
		IB1Serializer<?> serializerJson = new B1SerializerJson();
		// json反序列化付款
		data = serializerJson.deserialize(DATA_STRING_PAY, b1Company);
		if (data instanceof IPayments) {
			IPayments payment = (IPayments) data;
			if (payment.add() == 0) {
				System.out.println(String.format("payment: %s", b1Company.getNewObjectKey()));
			} else {
				System.err.println(b1Company.getLastErrorDescription());
			}
		}
		// json反序列化项目
		data = serializerJson.deserialize(DATA_STRING_PRJ, b1Company);
		if (data instanceof IProject) {
			IProjectsService projectsService = SBOCOMUtil.newProjectsService(b1Company.getCompanyService());
			projectsService.addProject((IProject) data);
		}
		// json反序列化凭单
		data = serializerJson.deserialize(DATA_STRING_JE, b1Company);
		if (data instanceof IJournalEntries) {
			IJournalEntries journalEntries = (IJournalEntries) data;
			if (journalEntries.add() == 0) {
				System.out.println(String.format("JournalEntries: %s", b1Company.getNewObjectKey()));
			} else {
				System.err.println(b1Company.getLastErrorDescription());
			}
		}
		// json反序列化自定义对象
		data = serializerJson.deserialize(DATA_STRING_UDO, b1Company);
		if (data instanceof IUserTable) {
			IUserTable table = (IUserTable) data;
			if (table.add() == 0) {
				System.out.println(String.format("table: %s", b1Company.getNewObjectKey()));
			} else {
				System.err.println(b1Company.getLastErrorDescription());
			}
		}
		// json反序列化单据
		data = serializerJson.deserialize(DATA_STRING_SO, b1Company);
		if (data instanceof IDocuments) {
			IDocuments order = (IDocuments) data;
			if (order.add() == 0) {
				System.out.println(String.format("order: %s", b1Company.getNewObjectKey()));
			} else {
				System.err.println(b1Company.getLastErrorDescription());
			}
		}

	}

}
