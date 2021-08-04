package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.colorcoding.ibas.bobas.businessone.data.B1DataConvert;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IFields;
import com.sap.smb.sbo.api.IValidValues;

public class B1SerializerXml extends B1Serializer<Schema> {

	public static final String XML_FILE_EXTENSION = ".xml";
	public static final String XML_FILE_ENCODING = "utf-8";
	public static final String XML_FILE_INDENT = "yes";
	public static final String XML_FILE_NAMESPACE = "http://www.w3.org/2001/XMLSchema";

	@Override
	public Schema getSchema(Class<?> type) throws SerializationException {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			this.getSchema(type, outputStream);
			SchemaFactory factory = SchemaFactory.newInstance(XML_FILE_NAMESPACE);
			try (InputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray())) {
				Source xsdSource = new StreamSource(inputStream);
				return factory.newSchema(xsdSource);
			}
		} catch (SAXException | IOException e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public void getSchema(Class<?> type, OutputStream outputStream) throws SerializationException {
		try {
			DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			DOMImplementation domImpl = db.getDOMImplementation();
			Document document = domImpl.createDocument(XML_FILE_NAMESPACE, "xs:schema", null);
			// 创建文档
			SchemaWriter schemaWriter = new SchemaWriter();
			schemaWriter.document = document;
			schemaWriter.element = new B1AnalyzerGetter().analyse(type);
			schemaWriter.write();
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

	private class SchemaWriter {

		public SchemaWriter() {
			this.knownTypes = new HashMap<>();
			this.knownTypes.put("integer", "xs:int");
			this.knownTypes.put("long", "xs:long");
			this.knownTypes.put("short", "xs:short");
			this.knownTypes.put("float", "xs:float");
			this.knownTypes.put("double", "xs:double");
			this.knownTypes.put("boolean", "xs:boolean");
			this.knownTypes.put("java.lang.Integer", "xs:int");
			this.knownTypes.put("java.lang.Long", "xs:long");
			this.knownTypes.put("java.lang.Short", "xs:short");
			this.knownTypes.put("java.math.BigInteger", "xs:integer");
			this.knownTypes.put("java.lang.Float", "xs:float");
			this.knownTypes.put("java.lang.Double", "xs:double");
			this.knownTypes.put("java.math.BigDecimal", "xs:decimal");
			this.knownTypes.put("java.lang.String", "xs:string");
			this.knownTypes.put("java.lang.Character", "xs:string");
			this.knownTypes.put("java.lang.Boolean", "xs:boolean");
			// this.knownTypes.put("java.util.Date", "xs:dateTime");
		}

		private Map<String, String> knownTypes;
		public Document document;
		public ElementRoot element;

		public void write() {
			if (this.element.getNamespace() != null) {
				document.getDocumentElement().setAttribute("targetNamespace", this.element.getNamespace());
			}
			org.w3c.dom.Element dom = this.document.createElement("xs:element");
			dom.setAttribute("name", this.element.getName());
			org.w3c.dom.Element domType = this.document.createElement("xs:complexType");
			org.w3c.dom.Element domSequence = this.document.createElement("xs:sequence");
			for (Element item : this.element.getChilds()) {
				this.write(domSequence, item);
			}
			domType.appendChild(domSequence);
			dom.appendChild(domType);
			this.document.getDocumentElement().appendChild(dom);
		}

		private void write(org.w3c.dom.Element domParent, Element element) {
			org.w3c.dom.Element dom = this.document.createElement("xs:element");
			// 获取元素类型
			String typeName = this.knownTypes.get(element.getType().getName());
			if (typeName != null) {
				// 已知类型
				// type="xs:string"
				dom.setAttribute("name", element.getName());
				dom.setAttribute("minOccurs", "0");
				dom.setAttribute("nillable", "true");
				dom.setAttribute("type", typeName);
			} else if (element.getType().isEnum()) {
				// 枚举类型
				// <xs:simpleType>
				// <xs:restriction base="xs:string">
				// <xs:enumeration value="Audi"/>
				// <xs:enumeration value="Golf"/>
				// <xs:enumeration value="BMW"/>
				// </xs:restriction>
				// </xs:simpleType>
				dom.setAttribute("name", element.getName());
				dom.setAttribute("minOccurs", "0");
				dom.setAttribute("nillable", "true");
				org.w3c.dom.Element domType = this.document.createElement("xs:simpleType");
				org.w3c.dom.Element domRestriction = this.document.createElement("xs:restriction");
				domRestriction.setAttribute("base", "xs:string");
				for (Object enumItem : element.getType().getEnumConstants()) {
					if (enumItem instanceof Enum<?>) {
						// 枚举值（比对枚举索引）
						Enum<?> itemValue = (Enum<?>) enumItem;
						org.w3c.dom.Element domEnumeration = this.document.createElement("xs:enumeration");
						domEnumeration.setAttribute("value", itemValue.name());
						domRestriction.appendChild(domEnumeration);
					}
				}
				domType.appendChild(domRestriction);
				dom.appendChild(domType);
			} else if (element.getType() == Date.class) {
				// 日期类型
				dom.setAttribute("name", element.getName());
				dom.setAttribute("minOccurs", "0");
				dom.setAttribute("nillable", "true");
				org.w3c.dom.Element domType = this.document.createElement("xs:simpleType");
				org.w3c.dom.Element domRestriction = this.document.createElement("xs:restriction");
				domRestriction.setAttribute("base", "xs:string");
				org.w3c.dom.Element domEnumeration = this.document.createElement("xs:pattern");
				// 格式：2000-01-01 or 2000-01-01T00:00:00
				domEnumeration.setAttribute("value",
						"|[0-9]{4}-[0-1][0-9]-[0-3][0-9]|[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9]");
				domRestriction.appendChild(domEnumeration);
				domType.appendChild(domRestriction);
				dom.appendChild(domType);
			} else if (element.isCollection()) {
				dom.setAttribute("name", element.getWrapper());
				dom.setAttribute("minOccurs", "0");
				dom.setAttribute("maxOccurs", "unbounded");
				org.w3c.dom.Element domType = this.document.createElement("xs:complexType");
				org.w3c.dom.Element domSequence = this.document.createElement("xs:sequence");
				org.w3c.dom.Element domItem = this.document.createElement("xs:element");
				domItem.setAttribute("name", element.getName());
				domItem.setAttribute("minOccurs", "0");
				domItem.setAttribute("maxOccurs", "unbounded");
				org.w3c.dom.Element domItemType = this.document.createElement("xs:complexType");
				org.w3c.dom.Element domItemSequence = this.document.createElement("xs:sequence");
				for (Element item : element.getChilds()) {
					this.write(domItemSequence, item);
				}
				domItemType.appendChild(domItemSequence);
				domItem.appendChild(domItemType);
				domSequence.appendChild(domItem);
				domType.appendChild(domSequence);
				dom.appendChild(domType);
			} else {
				dom.setAttribute("name", element.getName());
				dom.setAttribute("minOccurs", "0");
				dom.setAttribute("maxOccurs", "unbounded");
				org.w3c.dom.Element domType = this.document.createElement("xs:complexType");
				org.w3c.dom.Element domSequence = this.document.createElement("xs:sequence");
				for (Element item : element.getChilds()) {
					this.write(domSequence, item);
				}
				domType.appendChild(domSequence);
				dom.appendChild(domType);
			}
			domParent.appendChild(dom);
		}
	}

	@Override
	protected void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element) {
		try {
			// 创建文档
			DataWriter dataWriter = new DataWriter();
			dataWriter.document = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
			dataWriter.element = element;
			dataWriter.source = data;
			dataWriter.write();
			// 将xml写到文件中
			javax.xml.transform.Transformer transformer = TransformerFactory.newInstance().newTransformer();
			DOMSource source = new DOMSource(dataWriter.document);
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

	private class DataWriter {

		public DataWriter() {
			this.knownTypes = new ArrayList<>();
			this.knownTypes.add(Integer.class);
			this.knownTypes.add(Short.class);
			this.knownTypes.add(Long.class);
			this.knownTypes.add(Float.class);
			this.knownTypes.add(Double.class);
			this.knownTypes.add(String.class);
			this.knownTypes.add(Character.class);
			this.knownTypes.add(Boolean.class);
			this.knownTypes.add(BigDecimal.class);
			this.knownTypes.add(BigInteger.class);
		}

		private List<Class<?>> knownTypes;
		public Document document;
		public ElementRoot element;
		public Object source;

		public void write() {
			org.w3c.dom.Element domRoot = this.document.createElement(this.element.getName());
			for (Element item : this.element.getChilds()) {
				this.write(domRoot, item, this.source);
			}
			this.document.appendChild(domRoot);
		}

		private void write(org.w3c.dom.Element domParent, Element element, Object data) {
			Object value = B1AnalyzerGetter.getValue(element, data);
			if (value == null) {
				return;
			}
			if (value instanceof String) {
				if (((String) value).isEmpty()) {
					return;
				}
			}
			if (element.getType() == Date.class) {
				String tmp = B1DataConvert.toString(value);
				if (tmp != null) {
					org.w3c.dom.Element dom = this.document.createElement(element.getName());
					dom.setTextContent(tmp);
					domParent.appendChild(dom);
				}
			} else if (this.knownTypes.contains(element.getType()) || this.knownTypes.contains(value.getClass())) {
				org.w3c.dom.Element dom = this.document.createElement(element.getName());
				dom.setTextContent(B1DataConvert.toString(value));
				domParent.appendChild(dom);
			} else if (element.isCollection()) {
				org.w3c.dom.Element domWrapper = this.document.createElement(element.getWrapper());
				for (Object itemValue : B1DataConvert.toIterable(value)) {
					org.w3c.dom.Element domItem = this.document.createElement(element.getName());
					for (Element item : element.getChilds()) {
						this.write(domItem, item, itemValue);
					}
					domWrapper.appendChild(domItem);
				}
				domParent.appendChild(domWrapper);
			} else if (element.getType() == IFields.class) {
				org.w3c.dom.Element domWrapper = this.document.createElement(element.getWrapper());
				IFields fieldsValue = (IFields) value;
				for (int i = 0; i < fieldsValue.getCount(); i++) {
					org.w3c.dom.Element domItem = this.document.createElement(element.getName());
					for (Element item : element.getChilds()) {
						this.write(domItem, item, fieldsValue.item(i));
					}
					domWrapper.appendChild(domItem);
				}
				domParent.appendChild(domWrapper);
			} else if (element.getType() == IValidValues.class) {
				org.w3c.dom.Element domWrapper = this.document.createElement(element.getWrapper());
				IValidValues validValues = (IValidValues) value;
				for (int i = 0; i < validValues.getCount(); i++) {
					org.w3c.dom.Element domItem = this.document.createElement(element.getName());
					for (Element item : element.getChilds()) {
						this.write(domItem, item, validValues.item(i));
					}
					domWrapper.appendChild(domItem);
				}
				domParent.appendChild(domWrapper);
			} else {
				org.w3c.dom.Element domItem = this.document.createElement(element.getName());
				for (Element item : element.getChilds()) {
					this.write(domItem, item, value);
				}
				domParent.appendChild(domItem);
			}
		}
	}

	@Override
	public Object deserialize(InputStream inputStream, ICompany company) throws SerializationException {
		throw new SerializationException(I18N.prop("msg_bobas_not_supported"));
	}

}