package org.colorcoding.ibas.bobas.businessone;

import org.colorcoding.ibas.bobas.businessone.data.Enumeration;

import com.sap.smb.sbo.api.SBOCOMConstants;

import junit.framework.TestCase;

public class testUtils extends TestCase {

	public void testDataConvert() {
		assertEquals(SBOCOMConstants.BoDataServerTypes_dst_MSSQL2012,
				Enumeration.valueOf("BoDataServerTypes", "dst_MSSQL2012"));
	}
}
