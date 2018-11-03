package org.colorcoding.ibas.bobas.businessone;

import java.io.ByteArrayInputStream;
import java.io.File;
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
import org.colorcoding.ibas.bobas.serialization.ValidateException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDocuments;
import com.sap.smb.sbo.api.IItems;
import com.sap.smb.sbo.api.IProductionOrders;
import com.sap.smb.sbo.api.IRecordset;
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
		// xml序列化测试
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
	}

}
