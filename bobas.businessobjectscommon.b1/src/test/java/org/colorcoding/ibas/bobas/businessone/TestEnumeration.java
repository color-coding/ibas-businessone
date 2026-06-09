package org.colorcoding.ibas.bobas.businessone;

import org.colorcoding.ibas.bobas.businessone.data.Enumeration;

import com.sap.smb.sbo.api.SBOCOMConstants;

import junit.framework.TestCase;

/**
 * 测试枚举映射功能
 */
public class TestEnumeration extends TestCase {

	/**
	 * 测试枚举值查找
	 */
	public void testValueOf() {
		// 按名称查找B1对象类型编码
		assertEquals(SBOCOMConstants.BoObjectTypes_oItems,
				Enumeration.valueOf("BoObjectTypes", "Items"));
		assertEquals(SBOCOMConstants.BoDataServerTypes_dst_MSSQL2012,
				Enumeration.valueOf("BoDataServerTypes", "dst_MSSQL2012"));
		// 通配符查找
		assertEquals(SBOCOMConstants.BoObjectTypes_oItems,
				Enumeration.valueOf("BoObjectTypes", "*Items"));
		// 单据类型自动补前缀
		assertEquals(SBOCOMConstants.BoObjectTypes_Document_oOrders,
				Enumeration.valueOf("BoObjectTypes", "Orders"));
	}

	/**
	 * 测试对象类型判断
	 */
	public void testTypeCheck() {
		// 判断是否为单据类型
		assertTrue(Enumeration.isDocuments("Orders"));
		assertTrue(Enumeration.isDocuments(SBOCOMConstants.BoObjectTypes_Document_oOrders));
		assertFalse(Enumeration.isDocuments("Items"));
		// 判断是否为付款类型
		assertTrue(Enumeration.isPayments("IncomingPayments"));
		assertTrue(Enumeration.isPayments("PaymentsDrafts"));
		assertFalse(Enumeration.isPayments("Orders"));
		// 判断是否为自定义表
		assertTrue(Enumeration.isUserTable("UserTables"));
		assertFalse(Enumeration.isUserTable("Items"));
	}

	/**
	 * 测试按Class获取对象类型编码
	 */
	public void testValueOfClass() {
		assertEquals(SBOCOMConstants.BoObjectTypes_oItems,
				Enumeration.valueOf(com.sap.smb.sbo.api.IItems.class));
		assertEquals(SBOCOMConstants.BoObjectTypes_Document_oOrders,
				Enumeration.valueOf(com.sap.smb.sbo.api.IDocuments.class));
	}
}
