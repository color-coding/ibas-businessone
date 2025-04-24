package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.serialization.SerializationFactory;

public class SerializerManager {

	/**
	 * 输出字符串类型，XML
	 */
	public final static String TYPE_XML = SerializationFactory.TYPE_XML;
	/**
	 * 输出化字符串类型，JSON
	 */
	public final static String TYPE_JSON = SerializationFactory.TYPE_JSON;

	public final IB1Serializer create() {
		return this.create(null);
	}

	public IB1Serializer create(String sign) {
		if (TYPE_XML.equalsIgnoreCase(sign)) {
			return new B1SerializerXml();
		}
		return new B1SerializerJson();
	}

}
