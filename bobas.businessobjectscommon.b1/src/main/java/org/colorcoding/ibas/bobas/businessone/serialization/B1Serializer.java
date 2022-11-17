package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.data.DataConvertException;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
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

public abstract class B1Serializer<S> implements IB1Serializer<S> {

	protected static final String MSG_B1_SERIALIZER_WRAPPING_DATA = "b1 serializer: wrapping data [%s].";

	private volatile static Map<Class<?>, ElementRoot> elements = new HashMap<>();

	public static synchronized ElementRoot getElement(Class<?> clazz) {
		ElementRoot element = elements.get(clazz);
		if (element != null) {
			return element;
		}
		element = new B1AnalyzerGetter().analyse(clazz);
		elements.put(clazz, element);
		return element;
	}

	@Override
	public void validate(Class<?> type, InputStream data) throws ValidateException {
		this.validate(this.getSchema(type), data);
	}

	@Override
	public void validate(S schema, String data) throws ValidateException {
		try (InputStream stream = new ByteArrayInputStream(data.getBytes())) {
			this.validate(schema, stream);
		} catch (IOException e) {
			throw new ValidateException(e);
		}
	}

	@Override
	public void validate(Class<?> type, String data) throws ValidateException {
		try (InputStream stream = new ByteArrayInputStream(data.getBytes())) {
			this.validate(type, stream);
		} catch (IOException e) {
			throw new ValidateException(e);
		}
	}

	@Override
	public void serialize(Object object, OutputStream outputStream, Class<?>... types) throws SerializationException {
		this.serialize(object, outputStream,
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_FORMATTED_OUTPUT, false), types);
	}

	@Override
	public void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types) {
		this.serialize(object, outputStream, formated, getElement(object.getClass()));
	}

	@Override
	public <T> List<DataWrapping> wrap(T[] datas) throws SerializationException {
		List<DataWrapping> wrappings = new ArrayList<>();
		ElementRoot elementRoot = getElement(datas.getClass().getComponentType());
		for (T data : datas) {
			wrappings.add(this.wrap(data, elementRoot));
		}
		return wrappings;
	}

	@Override
	public <T> DataWrapping wrap(T data) throws SerializationException {
		return this.wrap(data, getElement(data.getClass()));
	}

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

	@Override
	public Object deserialize(String data, ICompany company) throws SerializationException {
		try (InputStream stream = new ByteArrayInputStream(data.getBytes())) {
			return this.deserialize(stream, company);
		} catch (IOException e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public Object deserialize(InputSource inputSource, ICompany company) throws SerializationException {
		return this.deserialize(inputSource.getByteStream(), company);
	}

	private static Map<String, Element[]> ENTRY_KEYS = new HashMap<String, Element[]>();

	/**
	 * 获取对象主键
	 * 
	 * @param className 对象名称
	 * @param company   公司
	 * @return
	 */
	@Override
	public Element[] getEntityKeys(String className, ICompany company) {
		try {
			if (!ENTRY_KEYS.containsKey(className)) {
				try {
					if (Enumeration.isUserTable(className)) {
						// 自定义表
						Element eleTable = new ElementMethod();
						eleTable.setName("TableName");
						eleTable.setType(String.class);
						Element eleCode = new ElementMethod();
						eleCode.setName("Code");
						eleCode.setType(String.class);
						ENTRY_KEYS.put(className, new Element[] { eleTable, eleCode });
					} else {
						// 其他对象
						Element[] keys = this.getEntityKeys(company.getBusinessObjectXmlSchema(
								Enumeration.valueOf(Enumeration.GROUP_BO_OBJECT_TYPES, className)));
						if (keys != null && keys.length > 0) {
							if (Enumeration.isDocuments(className) || Enumeration.isPayments(className)) {
								for (int i = 0; i < keys.length; i++) {
									Element element = keys[i];
									element.setType(Integer.class);
								}
								ENTRY_KEYS.put(className, keys);
							} else {
								for (Method method : SBOCOMUtil.class.getMethods()) {
									if (method.getName().equalsIgnoreCase("get" + className)
											&& keys.length + 1 == method.getParameterCount()) {
										for (int i = 0; i < keys.length; i++) {
											Element element = keys[i];
											element.setType(method.getParameterTypes()[i + 1]);
										}
										break;
									}
								}
								ENTRY_KEYS.put(className, keys);
							}
						}
					}
				} catch (DataConvertException e) {
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
	public Object getEntity(String className, Object[] keyValues, ICompany company) throws SerializationException {
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
				return data;
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
				return data;
			} else if (Enumeration.isUserTable(className)) {
				IUserTable table = company.getUserTables().item(keyValues[0]);
				if (keyValues[1] != null) {
					if (table.getByKey(String.valueOf(keyValues[1]))) {
						Logger.log(MessageLevel.DEBUG, "b1 serializer: got table [%s]'s data [%s].", keyValues[0],
								keyValues[1]);
					} else {
						Logger.log(MessageLevel.DEBUG, "b1 serializer: not found table [%s]'s data [%s].", keyValues[0],
								keyValues[1]);
					}
				}
				return table;
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
				return data;
			}

		} catch (NoSuchMethodException e) {
			return null;
		} catch (Exception e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public abstract Object deserialize(InputStream inputStream, ICompany company) throws SerializationException;

	protected abstract void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element);

}
