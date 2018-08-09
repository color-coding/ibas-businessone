package org.colorcoding.ibas.bobas.businessone;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.data.Decimal;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.sap.smb.sbo.api.SBOCOMConstants;

import junit.framework.TestCase;

public class TestUtils extends TestCase {

	public void testDataConvert() {
		assertEquals(SBOCOMConstants.BoDataServerTypes_dst_MSSQL2012,
				Enumeration.valueOf("BoDataServerTypes", "dst_MSSQL2012"));
	}

	public void testJson() throws IOException {
		OutputStream outputStream = new ByteArrayOutputStream();
		JsonGenerator jsonGenerator = new JsonFactory().createGenerator(outputStream);
		jsonGenerator.writeStartObject();
		jsonGenerator.writeObjectFieldStart("AdmInfo");
		jsonGenerator.writeStringField("Object", "4");
		jsonGenerator.writeEndObject();
		jsonGenerator.writeObjectFieldStart("OITM");
		jsonGenerator.writeArrayFieldStart("row");
		jsonGenerator.writeStartObject();
		jsonGenerator.writeStringField("ItemCode", "4");
		jsonGenerator.writeBooleanField("SellItem", true);
		jsonGenerator.writeNumberField("OnHand", Decimal.ONE);
		jsonGenerator.writeEndObject();
		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();
		jsonGenerator.writeEndObject();
		jsonGenerator.flush();
		jsonGenerator.close();
		System.out.println(outputStream.toString());
	}

}
