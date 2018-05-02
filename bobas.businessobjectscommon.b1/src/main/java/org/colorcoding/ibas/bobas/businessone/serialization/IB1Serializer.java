package org.colorcoding.ibas.bobas.businessone.serialization;

import java.util.List;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationException;

public interface IB1Serializer<S> extends ISerializer<S> {

	<T> List<DataWrapping> wrap(T[] datas) throws SerializationException;

	<T> DataWrapping wrap(T data) throws SerializationException;

}
