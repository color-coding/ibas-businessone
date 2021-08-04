package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sap.smb.sbo.api.ICompany;

public interface IB1Serializer<S> {

	/**
	 * 序列化
	 * 
	 * @param object       目标
	 * @param outputStream 输出流
	 * @param types        已知类型
	 * @throws SerializationException
	 */
	void serialize(Object object, OutputStream outputStream, Class<?>... types) throws SerializationException;

	/**
	 * 序列化
	 * 
	 * @param object       目标
	 * @param outputStream 输出流
	 * @param formated     是否格式化
	 * @param types        已知类型
	 * @throws SerializationException
	 */
	void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types)
			throws SerializationException;

	/**
	 * 获取schema
	 * 
	 * @param type 目标类型
	 * @return
	 * @throws SerializationException
	 */
	S getSchema(Class<?> type) throws SerializationException;

	/**
	 * 获取schema
	 * 
	 * @param type         目标类型
	 * @param outputStream 输出目标
	 * @throws SerializationException
	 */
	void getSchema(Class<?> type, OutputStream outputStream) throws SerializationException;

	/**
	 * 验证数据
	 * 
	 * @param schema 数据架构
	 * @param data   数据
	 * @throws SAXException
	 */
	void validate(S schema, InputStream data) throws ValidateException;

	/**
	 * 验证数据
	 * 
	 * @param schema 数据架构
	 * @param data   数据
	 * @throws SAXException
	 */
	void validate(S schema, String data) throws ValidateException;

	/**
	 * 验证数据
	 * 
	 * @param type 目标类型
	 * @param data 数据
	 * @throws SAXException
	 */
	void validate(Class<?> type, String data) throws ValidateException;

	/**
	 * 验证数据
	 * 
	 * @param type 目标类型
	 * @param data 数据
	 * @throws SAXException
	 */
	void validate(Class<?> type, InputStream data) throws ValidateException;

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
	Object deserialize(String data, ICompany company) throws SerializationException;

	/**
	 * 反序列化
	 * 
	 * @param inputStream 数据
	 * @param types       其他已知类型
	 * @return 新对象实例
	 */
	Object deserialize(InputStream inputStream, ICompany company) throws SerializationException;

	/**
	 * 反序列化
	 * 
	 * @param inputSource 数据
	 * @param types       其他已知类型
	 * @return 新对象实例
	 */
	Object deserialize(InputSource inputSource, ICompany company) throws SerializationException;

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
	Object getEntity(String className, Object[] keyValues, ICompany company) throws SerializationException;
}
