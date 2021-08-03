package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementField;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.SBOCOMConstants;

public abstract class B1Serializer<S> implements IB1Serializer<S> {

	protected static final String MSG_B1_SERIALIZER_WRAPPING_DATA = "b1 serializer: wrapping data [%s].";

	private volatile static Map<Class<?>, ElementRoot> elements = new HashMap<>();

	protected static synchronized ElementRoot getElement(Class<?> clazz) {
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
	 * @throws InvocationTargetException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws DOMException
	 * @throws ClassNotFoundException
	 */
	protected Element[] getB1EntryKeys(String className, ICompany company)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException,
			ParserConfigurationException, SAXException, ClassNotFoundException, DOMException {
		if (!ENTRY_KEYS.containsKey(className)) {
			for (Field field : SBOCOMConstants.class.getFields()) {
				if (field.getName().startsWith("BoObjectTypes_") && field.getName().endsWith("o" + className)) {
					ENTRY_KEYS.put(className,
							this.getB1EntryKeys(company.getBusinessObjectXmlSchema((Integer) (field.get(null)))));
				}
			}
		}
		return ENTRY_KEYS.get(className);
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
	protected Element[] getB1EntryKeys(String schema)
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
					Element element = new ElementField();
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

	@Override
	public abstract Object deserialize(InputStream inputStream, ICompany company) throws SerializationException;

	protected abstract void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element);

}
