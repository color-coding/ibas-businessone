package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.OutputStream;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.SerializationException;

public interface IB1Serializer {

	DataWrapping wrap(String xmlData) throws SerializationException;

	String serialize(String xmlData) throws SerializationException;

	void serialize(String xmlData, OutputStream outputStream) throws SerializationException;

	<T> T deserialize(String data, Class<T> type) throws SerializationException;
}
