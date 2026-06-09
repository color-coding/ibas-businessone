package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.Serializer;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementMethod;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IUserTable;
import com.sap.smb.sbo.api.SBOCOMUtil;

public abstract class B1Serializer extends Serializer implements IB1Serializer {

	protected static final String MSG_B1_SERIALIZER_WRAPPING_DATA = "b1 serializer: wrapping data [%s].";

	private static final ConcurrentHashMap<Class<?>, ElementRoot> elements = new ConcurrentHashMap<>();

	/**
	 * 获取类的元素根节点定义（带缓存）
	 * <p>
	 * 使用ConcurrentHashMap缓存已分析的类结构，避免重复分析
	 *
	 * @param clazz 要分析的类
	 * @return 元素根节点定义
	 */
	public static ElementRoot getElement(Class<?> clazz) {
		ElementRoot element = elements.get(clazz);
		if (element != null) {
			return element;
		}
		element = new B1AnalyzerGetter().analyse(clazz);
		ElementRoot existing = elements.putIfAbsent(clazz, element);
		return existing != null ? existing : element;
	}

	private ICompany company;

	/**
	 * 获取B1公司连接
	 *
	 * @return B1公司连接对象
	 */
	public ICompany getCompany() {
		return company;
	}

	/**
	 * 设置B1公司连接
	 *
	 * @param company B1公司连接对象
	 */
	public void setCompany(ICompany company) {
		this.company = company;
	}

	/**
	 * 验证数据是否符合类型定义的格式
	 *
	 * @param type 数据类型
	 * @param data 要验证的数据字符串
	 * @throws ValidateException 验证失败时抛出
	 */
	@Override
	public void validate(Class<?> type, String data) throws ValidateException {
		try (InputStream stream = new ByteArrayInputStream(data.getBytes("UTF-8"))) {
			this.validate(type, stream);
		} catch (IOException e) {
			throw new ValidateException(e);
		}
	}

	/**
	 * 序列化对象到输出流
	 *
	 * @param object       要序列化的对象
	 * @param outputStream 输出流
	 * @param types        类型数组（可选）
	 * @throws SerializationException 序列化失败时抛出
	 */
	@Override
	public void serialize(Object object, OutputStream outputStream, Class<?>... types) throws SerializationException {
		this.serialize(object, outputStream,
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_FORMATTED_OUTPUT, false), types);
	}

	/**
	 * 序列化对象到输出流（可指定格式化）
	 *
	 * @param object       要序列化的对象
	 * @param outputStream 输出流
	 * @param formated     是否格式化输出
	 * @param types        类型数组（可选）
	 */
	@Override
	public void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types) {
		this.serialize(object, outputStream, formated, getElement(object.getClass()));
	}

	/**
	 * 批量包装数据为数据包装对象列表
	 *
	 * @param <T>  数据类型
	 * @param datas 数据对象数组
	 * @return 数据包装对象列表
	 * @throws SerializationException 序列化失败时抛出
	 */
	@Override
	public <T> List<DataWrapping> wrap(T[] datas) throws SerializationException {
		List<DataWrapping> wrappings = new ArrayList<>();
		ElementRoot elementRoot = getElement(datas.getClass().getComponentType());
		for (T data : datas) {
			wrappings.add(this.wrap(data, elementRoot));
		}
		return wrappings;
	}

	/**
	 * 包装单个数据对象为数据包装对象
	 *
	 * @param <T>  数据类型
	 * @param data 数据对象
	 * @return 数据包装对象
	 * @throws SerializationException 序列化失败时抛出
	 */
	@Override
	public <T> DataWrapping wrap(T data) throws SerializationException {
		return this.wrap(data, getElement(data.getClass()));
	}

	/**
	 * 包装数据对象为数据包装对象（指定元素定义）
	 *
	 * @param <T>     数据类型
	 * @param data    数据对象
	 * @param element 元素根节点定义
	 * @return 数据包装对象
	 * @throws SerializationException 序列化失败时抛出
	 */
	public <T> DataWrapping wrap(T data, ElementRoot element) throws SerializationException {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			if (MyConfiguration.isDebugMode()) {
				Logger.log(MessageLevel.DEBUG, MSG_B1_SERIALIZER_WRAPPING_DATA,
						data == null ? "Unknown" : data.getClass().getName());
			}
			this.serialize(data, outputStream, false, element);
			return new DataWrapping(new String(outputStream.toByteArray(), "utf-8"));
		} catch (IOException e) {
			throw new SerializationException(e);
		}
	}

	/**
	 * 从字符串反序列化为对象
	 *
	 * @param <T>     返回类型
	 * @param data    数据字符串
	 * @param company B1公司连接
	 * @return 反序列化的对象
	 * @throws SerializationException 反序列化失败时抛出
	 */
	@Override
	public <T> T deserialize(String data, ICompany company) throws SerializationException {
		try (InputStream stream = new ByteArrayInputStream(data.getBytes("UTF-8"))) {
			return this.deserialize(stream, company);
		} catch (IOException e) {
			throw new SerializationException(e);
		}
	}

	/**
	 * 从InputSource反序列化为对象
	 *
	 * @param <T>         返回类型
	 * @param inputSource 输入源
	 * @param company     B1公司连接
	 * @return 反序列化的对象
	 * @throws SerializationException 反序列化失败时抛出
	 */
	@Override
	public <T> T deserialize(InputSource inputSource, ICompany company) throws SerializationException {
		return this.deserialize(inputSource.getByteStream(), company);
	}

	/**
	 * 从输入流反序列化为对象（使用已设置的Company）
	 *
	 * @param <T>          返回类型
	 * @param inputStream  输入流
	 * @param types        类型数组（可选）
	 * @return 反序列化的对象
	 * @throws SerializationException 反序列化失败或公司连接无效时抛出
	 */
	@Override
	public <T> T deserialize(InputStream inputStream, Class<?>... types) throws SerializationException {
		if (this.getCompany() == null || !this.getCompany().isConnected()) {
			throw new SerializationException(I18N.prop("msg_b1_invalid_company"));
		}
		return this.deserialize(inputStream, this.getCompany());
	}

	/**
	 * 从Reader反序列化为对象（使用已设置的Company）
	 *
	 * @param <T>   返回类型
	 * @param reader 读取器
	 * @param types  类型数组（可选）
	 * @return 反序列化的对象
	 * @throws SerializationException 反序列化失败或公司连接无效时抛出
	 */
	@Override
	public <T> T deserialize(Reader reader, Class<?>... types) throws SerializationException {
		if (this.getCompany() == null || !this.getCompany().isConnected()) {
			throw new SerializationException(I18N.prop("msg_b1_invalid_company"));
		}
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				Writer writer = new OutputStreamWriter(outputStream, "UTF-8")) {
			int length;
			char[] buffer = new char[1024];
			while ((length = reader.read(buffer)) != -1) {
				writer.write(buffer, 0, length);
			}
			writer.flush();
			return this.deserialize(new ByteArrayInputStream(outputStream.toByteArray()), this.getCompany());
		} catch (Exception e) {
			throw new SerializationException(e);
		}
	}

	private static final ConcurrentHashMap<String, Element[]> ENTRY_KEYS = new ConcurrentHashMap<>();

	/**
	 * 缓存SBOCOMUtil的方法，避免每次反射遍历
	 */
	private static volatile Method[] SBO_COM_METHODS = null;

	/**
	 * 获取SBOCOMUtil的所有方法（带缓存）
	 * <p>
	 * 使用volatile和同步块实现懒加载单例模式
	 *
	 * @return SBOCOMUtil的方法数组
	 */
	private static Method[] getSboComMethods() {
		if (SBO_COM_METHODS == null) {
			synchronized (B1Serializer.class) {
				if (SBO_COM_METHODS == null) {
					SBO_COM_METHODS = SBOCOMUtil.class.getMethods();
				}
			}
		}
		return SBO_COM_METHODS;
	}

	/**
	 * 获取对象主键
	 *
	 * @param className 对象名称
	 * @param company   公司
	 * @return
	 */
	@Override
	public Element[] getEntityKeys(String className, ICompany company) {
		Element[] cached = ENTRY_KEYS.get(className);
		if (cached != null) {
			return cached;
		}
		try {
			if (Enumeration.isUserTable(className)) {
				// 自定义表
				Element eleTable = new ElementMethod();
				eleTable.setName("TableName");
				eleTable.setType(String.class);
				Element eleCode = new ElementMethod();
				eleCode.setName("Code");
				eleCode.setType(String.class);
				Element[] keys = new Element[] { eleTable, eleCode };
				ENTRY_KEYS.putIfAbsent(className, keys);
			} else {
				// 其他对象
				Element[] keys = this.getEntityKeys(company.getBusinessObjectXmlSchema(
						Enumeration.valueOf(Enumeration.GROUP_BO_OBJECT_TYPES, className)));
				if (keys != null && keys.length > 0) {
					if (Enumeration.isDocuments(className) || Enumeration.isPayments(className)) {
						for (int i = 0; i < keys.length; i++) {
							keys[i].setType(Integer.class);
						}
						ENTRY_KEYS.putIfAbsent(className, keys);
					} else {
						// 使用缓存的方法数组，避免每次反射遍历
						for (Method method : getSboComMethods()) {
							if (method.getName().equalsIgnoreCase("get" + className)
									&& keys.length + 1 == method.getParameterCount()) {
								for (int i = 0; i < keys.length; i++) {
									keys[i].setType(method.getParameterTypes()[i + 1]);
								}
								break;
							}
						}
						ENTRY_KEYS.putIfAbsent(className, keys);
					}
				}
			}
			return ENTRY_KEYS.get(className);
		} catch (Exception e) {
			throw new SerializationException(e);
		}
	}

	private static final Element[] EMPTY_ELEMENTS = new Element[] {};

	/**
	 * 获取对象主键
	 * 
	 * @param schema 说明
	 * @return
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws DOMException
	 * @throws ClassNotFoundException
	 */
	protected Element[] getEntityKeys(String schema)
			throws ParserConfigurationException, SAXException, ClassNotFoundException, DOMException {
		try (InputStream stream = new ByteArrayInputStream(schema.getBytes("utf-16"))) {
			DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			Document document = builder.parse(stream);
			NodeList keyNodes = document.getElementsByTagName("element");
			for (int i = 0; i < keyNodes.getLength(); i++) {
				Node kNode = keyNodes.item(i);
				Node aNode = kNode.getAttributes().getNamedItem("name");
				if (aNode == null || !"QueryParams".equals(aNode.getNodeValue())) {
					continue;
				}
				// complexType
				kNode = kNode.getFirstChild();
				if (kNode == null) {
					continue;
				}
				// all
				kNode = kNode.getFirstChild();
				if (kNode == null) {
					continue;
				}
				// element
				ArrayList<Element> keys = new ArrayList<>();
				for (int ii = 0; ii < kNode.getChildNodes().getLength(); ii++) {
					Node cNode = kNode.getChildNodes().item(ii);
					Element element = new ElementMethod();
					aNode = cNode.getAttributes().getNamedItem("name");
					if (aNode == null) {
						throw new IndexOutOfBoundsException();
					}
					element.setName(aNode.getNodeValue());
					aNode = cNode.getAttributes().getNamedItem("type");
					if (aNode == null) {
						throw new IndexOutOfBoundsException();
					}
					keys.add(element);
				}
				return keys.toArray(new Element[] {});
			}
		} catch (IOException e) {
			Logger.log(e);
		}
		return EMPTY_ELEMENTS;
	}

	/**
	 * 获取实体
	 * 
	 * @param className 名称
	 * @param keyValues 主键值
	 * @param company   公司
	 * @return
	 */
	@Override
	@SuppressWarnings("unchecked")
	public <T> T getEntity(String className, Object[] keyValues, ICompany company) throws SerializationException {
		Element[] keys = this.getEntityKeys(className, company);
		if (keys == null || keys.length == 0 || keys.length != keyValues.length) {
			throw new IndexOutOfBoundsException("entity key values.");
		}
		StringBuilder builder = new StringBuilder();
		Class<?>[] types = new Class<?>[keys.length + 1];
		Object[] params = new Object[keys.length + 1];
		params[0] = company;
		types[0] = ICompany.class;
		for (int i = 0; i < keys.length; i++) {
			params[i + 1] = keyValues[i];
			types[i + 1] = keys[i].getType();
			if (builder.length() > 0) {
				builder.append(" && ");
			}
			builder.append(keys[i].getName());
			builder.append(" = ");
			builder.append(keyValues[i]);
		}
		try {
			if (Enumeration.isDocuments(className) && !Enumeration.isPayments(className)) {
				Object data = SBOCOMUtil.getDocuments(company,
						Enumeration.valueOf(Enumeration.GROUP_BO_OBJECT_TYPES, className), (Integer) keyValues[0]);
				if (data != null) {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: got [%s]'s data [%s].", className,
							builder.toString());
				} else {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: not found [%s]'s data [%s].", className,
							builder.toString());
				}
				return (T) data;
			} else if (Enumeration.isPayments(className)) {
				Object data = SBOCOMUtil.getPayments(company,
						Enumeration.valueOf(Enumeration.GROUP_BO_OBJECT_TYPES, className), (Integer) keyValues[0]);
				if (data != null) {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: got [%s]'s data [%s].", className,
							builder.toString());
				} else {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: not found [%s]'s data [%s].", className,
							builder.toString());
				}
				return (T) data;
			} else if (Enumeration.isUserTable(className)) {
				IUserTable data = company.getUserTables().item(keyValues[0]);
				if (keyValues[1] != null) {
					if (data.getByKey(String.valueOf(keyValues[1]))) {
						Logger.log(MessageLevel.DEBUG, "b1 serializer: got table [%s]'s data [%s].", keyValues[0],
								keyValues[1]);
					} else {
						Logger.log(MessageLevel.DEBUG, "b1 serializer: not found table [%s]'s data [%s].", keyValues[0],
								keyValues[1]);
					}
				}
				return (T) data;
			} else {
				Method method = SBOCOMUtil.class.getMethod("get" + className, types);
				Object data = method.invoke(null, params);
				if (data != null) {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: got [%s]'s data [%s].", className,
							builder.toString());
				} else {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: not found [%s]'s data [%s].", className,
							builder.toString());
				}
				return (T) data;
			}

		} catch (NoSuchMethodException e) {
			return null;
		} catch (Exception e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public abstract void validate(Class<?> type, InputStream data) throws ValidateException;

	@Override
	public abstract <T> T deserialize(InputStream inputStream, ICompany company) throws SerializationException;

	protected abstract void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element);

}
