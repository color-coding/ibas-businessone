package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.InputStream;
import java.util.List;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.xml.sax.InputSource;

import com.sap.smb.sbo.api.ICompany;

public interface IB1Serializer extends ISerializer {

	/**
	 * 包装对象
	 * 
	 * @param <T>   类型
	 * @param datas 数据
	 * @return
	 * @throws SerializationException
	 */
	<T> List<DataWrapping> wrap(T[] datas) throws SerializationException;

	/**
	 * 包装对象
	 * 
	 * @param <T>   类型
	 * @param datas 数据
	 * @return
	 * @throws SerializationException
	 */
	<T> DataWrapping wrap(T data) throws SerializationException;

	/**
	 * 反序列化
	 * 
	 * @param data  数据
	 * @param types 其他已知类型
	 * @return 新对象实例
	 */
	<T> T deserialize(String data, ICompany company) throws SerializationException;

	/**
	 * 反序列化
	 * 
	 * @param inputStream 数据
	 * @param types       其他已知类型
	 * @return 新对象实例
	 */
	<T> T deserialize(InputStream inputStream, ICompany company) throws SerializationException;

	/**
	 * 反序列化
	 * 
	 * @param inputSource 数据
	 * @param types       其他已知类型
	 * @return 新对象实例
	 */
	<T> T deserialize(InputSource inputSource, ICompany company) throws SerializationException;

	/**
	 * 获取实体主键
	 * 
	 * @param className 名称
	 * @param company   公司（提供schema）
	 * @return
	 */
	Element[] getEntityKeys(String className, ICompany company) throws SerializationException;

	/**
	 * 获取实体
	 * 
	 * @param className 名称
	 * @param keyValues 主键值
	 * @param company   公司
	 * @return
	 */
	<T> T getEntity(String className, Object[] keyValues, ICompany company) throws SerializationException;
}
