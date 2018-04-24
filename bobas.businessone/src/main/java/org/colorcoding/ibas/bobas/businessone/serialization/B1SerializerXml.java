package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.serialization.SerializationElement;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDataBrowser;
import com.sap.smb.sbo.api.IUserFields;

public class B1SerializerXml extends B1Serializer<Schema> {

	public static final String XML_FILE_EXTENSION = ".xml";
	public static final String XML_FILE_ENCODING = "utf-8";
	public static final String XML_FILE_INDENT = "yes";
	public static final String XML_FILE_NAMESPACE = "http://www.w3.org/2001/XMLSchema";

	public B1SerializerXml(ICompany b1Company) {
		super(b1Company);
	}

	@Override
	public Schema getSchema(Class<?> type) throws SerializationException {
		try {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			this.getSchema(type, outputStream);
			SchemaFactory factory = SchemaFactory.newInstance(XML_FILE_NAMESPACE);
			Source xsdSource = new StreamSource(new ByteArrayInputStream(outputStream.toByteArray()));
			return factory.newSchema(xsdSource);
		} catch (SAXException e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public void getSchema(Class<?> type, OutputStream outputStream) throws SerializationException {
		try {
			DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			DOMImplementation domImpl = db.getDOMImplementation();
			Document document = domImpl.createDocument(XML_FILE_NAMESPACE, "xs:schema", null);
			this.createSerializationElement(document, type);
			// 将xml写到文件中
			javax.xml.transform.Transformer transformer = TransformerFactory.newInstance().newTransformer();
			DOMSource source = new DOMSource(document);
			// 添加xml 头信息
			transformer.setOutputProperty(OutputKeys.METHOD, "xml");
			transformer.setOutputProperty(OutputKeys.ENCODING, XML_FILE_ENCODING);
			transformer.setOutputProperty(OutputKeys.INDENT, XML_FILE_INDENT);
			boolean formatted = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_FORMATTED_OUTPUT, false);
			if (formatted) {
				transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
			}
			transformer.transform(source, new StreamResult(outputStream));
		} catch (ParserConfigurationException | TransformerException e) {
			throw new SerializationException(e);
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
				}
			}
		}
	}

	protected void createSerializationElement(Document document, Class<?> type) {
		Element element = this.createSerializationElement(document, type, "" + type.getSimpleName(), true);
		XmlRootElement annotation = type.getAnnotation(XmlRootElement.class);
		if (annotation != null) {
			document.getDocumentElement().setAttribute("targetNamespace", annotation.namespace());
		}
		document.getDocumentElement().appendChild(element);
	}

	protected Element createSerializationElement(Document document, Class<?> type, String name, boolean isRoot) {
		Element element = document.createElement("xs:element");
		element.setAttribute("name", name);
		// 获取元素类型
		String typeName = this.getKnownTyps().get(type.getName());
		if (typeName != null) {
			// 已知类型
			// type="xs:string"
			if (!isRoot) {
				element.setAttribute("minOccurs", "0");
				element.setAttribute("nillable", "true");
			}
			element.setAttribute("type", typeName);
		} else if (type.isEnum()) {
			// 枚举类型
			// <xs:simpleType>
			// <xs:restriction base="xs:string">
			// <xs:enumeration value="Audi"/>
			// <xs:enumeration value="Golf"/>
			// <xs:enumeration value="BMW"/>
			// </xs:restriction>
			// </xs:simpleType>
			if (!isRoot) {
				element.setAttribute("minOccurs", "0");
				element.setAttribute("nillable", "true");
			}
			Element elementType = document.createElement("xs:simpleType");
			Element elementRestriction = document.createElement("xs:restriction");
			elementRestriction.setAttribute("base", "xs:string");
			for (Object enumItem : type.getEnumConstants()) {
				if (enumItem instanceof Enum<?>) {
					// 枚举值（比对枚举索引）
					Enum<?> itemValue = (Enum<?>) enumItem;
					Element elementEnumeration = document.createElement("xs:enumeration");
					elementEnumeration.setAttribute("value", itemValue.name());
					elementRestriction.appendChild(elementEnumeration);
				}
			}
			elementType.appendChild(elementRestriction);
			element.appendChild(elementType);
		} else if (type.equals(DateTime.class) || type.equals(Date.class)) {
			// 日期类型
			if (!isRoot) {
				element.setAttribute("minOccurs", "0");
				element.setAttribute("nillable", "true");
			}
			Element elementType = document.createElement("xs:simpleType");
			Element elementRestriction = document.createElement("xs:restriction");
			elementRestriction.setAttribute("base", "xs:string");
			Element elementEnumeration = document.createElement("xs:pattern");
			// 格式：2000-01-01 or 2000-01-01T00:00:00
			elementEnumeration.setAttribute("value",
					"|[0-9]{4}-[0-1][0-9]-[0-3][0-9]|[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9]");
			elementRestriction.appendChild(elementEnumeration);
			elementType.appendChild(elementRestriction);
			element.appendChild(elementType);
		} else if (type.equals(IUserFields.class)) {
		} else if (type.equals(IDataBrowser.class)) {
		} else {
			// 未处理的类型，可能为类，继续处理
			// <xs:complexType>
			// <xs:sequence>
			// <xs:element />
			// </xs:sequence>
			// </xs:complexType>
			if (!isRoot) {
				element.setAttribute("minOccurs", "0");
				element.setAttribute("maxOccurs", "unbounded");
			}
			Element elementType = document.createElement("xs:complexType");
			Element elementSequence = document.createElement("xs:sequence");
			for (SerializationElement item : this.getSerializedElements(type, true)) {
				if (type.equals(item.getType())) {
					// 子项是自身，不做处理
					continue;
				}
				if (this.isCollection(item.getType())) {
					Element itemElement = document.createElement("xs:element");
					itemElement.setAttribute("name", item.getWrapper());
					itemElement.setAttribute("minOccurs", "0");
					itemElement.setAttribute("maxOccurs", "unbounded");
					Element itemElementType = document.createElement("xs:complexType");
					Element itemElementSequence = document.createElement("xs:sequence");
					itemElementSequence.appendChild(
							this.createSerializationElement(document, item.getType(), item.getName(), false));
					itemElementType.appendChild(itemElementSequence);
					itemElement.appendChild(itemElementType);
					elementSequence.appendChild(itemElement);
				} else {
					elementSequence.appendChild(
							this.createSerializationElement(document, item.getType(), item.getName(), false));
				}
			}
			elementType.appendChild(elementSequence);
			element.appendChild(elementType);
		}
		return element;
	}

	private Map<String, String> knownTypes;

	public Map<String, String> getKnownTyps() {
		if (this.knownTypes == null) {
			this.knownTypes = new HashMap<>();
			this.knownTypes.put("integer", "xs:integer");
			this.knownTypes.put("short", "xs:integer");
			this.knownTypes.put("boolean", "xs:boolean");
			this.knownTypes.put("float", "xs:decimal");
			this.knownTypes.put("double", "xs:decimal");
			this.knownTypes.put("java.lang.Integer", "xs:integer");
			this.knownTypes.put("java.lang.String", "xs:string");
			this.knownTypes.put("java.lang.Short", "xs:integer");
			this.knownTypes.put("java.lang.Boolean", "xs:boolean");
			this.knownTypes.put("java.lang.Float", "xs:decimal");
			this.knownTypes.put("java.lang.Double", "xs:decimal");
			this.knownTypes.put("java.lang.Character", "xs:string");
			this.knownTypes.put("java.math.BigDecimal", "xs:decimal");
			this.knownTypes.put("org.colorcoding.ibas.bobas.data.Decimal", "xs:decimal");
		}
		return this.knownTypes;
	}

	@Override
	public void validate(Schema schema, InputStream data) throws ValidateException {
		try {
			Validator validator = schema.newValidator();
			Source xmlSource = new StreamSource(data);
			validator.validate(xmlSource);
		} catch (SAXException | IOException e) {
			throw new ValidateException(e);
		} finally {
			if (data != null) {
				try {
					data.close();
				} catch (IOException e) {
				}
			}
		}
	}

	@Override
	public void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types) {
		Class<?> type = object.getClass();
		try {
			Method methodGetXml = null;
			try {
				methodGetXml = type.getMethod("getAsXML");
			} catch (NoSuchMethodException e) {
				methodGetXml = type.getMethod("toXMLString");
			}
			if (methodGetXml != null) {
				Object data = methodGetXml.invoke(object);
				if (data instanceof String) {
					outputStream.write(((String) data).getBytes(
							MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_B1_DATA_ENCODING, "utf-8")));
					outputStream.flush();
					return;
				}
			}
		} catch (Exception e) {
			throw new SerializationException(e);
		}
		throw new SerializationException(I18N.prop("msg_bobas_data_type_not_support", type.getName()));
	}

	@Override
	public Object deserialize(InputSource inputSource, Class<?>... types) throws SerializationException {

		return null;
	}
}
