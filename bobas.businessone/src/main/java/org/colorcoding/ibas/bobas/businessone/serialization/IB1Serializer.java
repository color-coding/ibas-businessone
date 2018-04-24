package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationException;

public interface IB1Serializer<S> extends ISerializer<S> {

	DataWrapping wrap(String xmlData) throws SerializationException;

}
