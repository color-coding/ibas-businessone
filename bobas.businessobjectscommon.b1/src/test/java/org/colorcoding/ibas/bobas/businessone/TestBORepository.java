package org.colorcoding.ibas.bobas.businessone;

import java.io.IOException;

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
import org.colorcoding.ibas.bobas.repository.RepositoryException;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDocuments;
import com.sap.smb.sbo.api.IItems;
import com.sap.smb.sbo.api.IJournalEntries;
import com.sap.smb.sbo.api.IUserTable;
import com.sap.smb.sbo.api.SBOCOMException;

import junit.framework.TestCase;

/**
 * 测试仓库与序列化功能（需要B1服务环境）
 */
public class TestBORepository extends TestCase {

	private static final String TOKEN = "";

	/**
	 * 测试查询并序列化为XML/JSON（fetch + validate）
	 */
	public void testFetch() throws IOException, ValidateException, RepositoryException {
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

		// XML序列化
		boRepository.setSerialization("xml");
		B1SerializerXml serializerXml = new B1SerializerXml();
		IOperationResult<DataWrapping> operationResult = boRepository.fetchItems(criteria, TOKEN);
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		for (DataWrapping data : operationResult.getResultObjects()) {
			serializerXml.validate(IItems.class, data.getContent());
		}

		// JSON序列化
		boRepository.setSerialization("json");
		B1SerializerJson serializerJson = new B1SerializerJson();
		operationResult = boRepository.fetchItems(criteria, TOKEN);
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		for (DataWrapping data : operationResult.getResultObjects()) {
			serializerJson.validate(IItems.class, data.getContent());
		}
		// 凭证
		criteria = new Criteria();
		sort = criteria.getSorts().create();
		sort.setAlias("TransId");
		sort.setSortType(SortType.DESCENDING);
		criteria.setResultCount(1);
		operationResult = boRepository.fetchJournalEntries(criteria, TOKEN);
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		for (DataWrapping data : operationResult.getResultObjects()) {
			serializerJson.validate(IJournalEntries.class, data.getContent());
		}
	}

	/**
	 * 测试JSON反序列化并创建B1对象（deserialize + add）
	 */
	public void testDeserialize() throws RepositoryException, SBOCOMException, SerializationException {
		BORepositoryDemo boRepository = new BORepositoryDemo();
		boRepository.openRepository();
		ICompany b1Company = boRepository.getCompany();
		IB1Serializer serializerJson = new B1SerializerJson();
		Object data;

		// 反序列化凭单
		data = serializerJson.deserialize(
				"{\"type\":\"JournalEntries\",\"memo\":\"测试\",\"lines\":[{\"accountCode\":\"540101\",\"debit\":1.0},{\"accountCode\":\"100101\",\"credit\":1.0}]}",
				b1Company);
		assertTrue(data instanceof IJournalEntries);

		// 反序列化单据
		data = serializerJson.deserialize(
				"{\"type\":\"Orders\",\"cardCode\":\"C20000\",\"docDueDate\":\"2022-01-10\",\"lines\":[{\"itemCode\":\"A00001\",\"quantity\":1.0}]}",
				b1Company);
		assertTrue(data instanceof IDocuments);

		// 反序列化自定义对象
		data = serializerJson.deserialize(
				"{\"type\":\"UserTables\",\"tableName\":\"AVA_GP_SETTING\",\"code\":\"TEST\",\"name\":\"TEST\"}",
				b1Company);
		assertTrue(data instanceof IUserTable);

		boRepository.closeRepository();
	}
}
