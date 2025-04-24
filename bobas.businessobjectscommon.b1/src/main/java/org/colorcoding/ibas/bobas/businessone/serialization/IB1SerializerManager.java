package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.serialization.SerializationFactory;

public interface IB1SerializerManager {
	final static String TYPE_XML = SerializationFactory.TYPE_XML;
	final static String TYPE_JSON = SerializationFactory.TYPE_JSON;

	IB1Serializer<?> create(String sign);
}
