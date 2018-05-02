package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.serialization.ISerializerManager;

import com.sap.smb.sbo.api.ICompany;

public interface IB1SerializerManager {
	final static String TYPE_XML = ISerializerManager.TYPE_XML;
	final static String TYPE_JSON = ISerializerManager.TYPE_JSON;

	IB1Serializer<?> create(ICompany b1Company, String sign);
}
