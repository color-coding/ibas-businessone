package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.colorcoding.ibas.bobas.businessone.data.B1DataConvert;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.ICompanyService;
import com.sap.smb.sbo.api.IFields;
import com.sap.smb.sbo.api.IValidValues;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class B1SerializerJson extends B1Serializer<JsonSchema> {

	public static final String SCHEMA_VERSION = "http://json-schema.org/schema#";

	protected String nameElement(String name) {
		int index = 0;
		for (char item : name.toCharArray()) {
			if (Character.isUpperCase(item)) {
				index++;
			} else {
				break;
			}
		}
		if (index > 0) {
			if (index == 1 || index == name.length()) {
				name = name.substring(0, index).toLowerCase() + name.substring(index);
			} else {
				index -= 1;
				name = name.substring(0, index).toLowerCase() + name.substring(index);
			}
		}
		return name;
	}

	@Override
	public void validate(JsonSchema schema, InputStream data) throws ValidateException {
		try (Reader reader = new InputStreamReader(data)) {
			JsonNode jsonData = JsonLoader.fromReader(reader);
			this.validate(schema, jsonData);
		} catch (IOException e) {
			throw new ValidateException(e);
		}
	}

	public void validate(JsonSchema schema, JsonNode data) throws ValidateException {
		try {
			ProcessingReport report = schema.validate(data);
			if (!report.isSuccess()) {
				throw new ValidateException(report.toString());
			}
		} catch (ValidateException e) {
			throw e;
		} catch (ProcessingException e) {
			throw new ValidateException(e);
		}
	}

	@Override
	public JsonSchema getSchema(Class<?> type) throws SerializationException {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			this.getSchema(type, outputStream);
			try (InputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray())) {
				try (Reader reader = new InputStreamReader(inputStream)) {
					JsonNode jsonSchema = JsonLoader.fromReader(reader);
					return JsonSchemaFactory.byDefault().getJsonSchema(jsonSchema);
				}
			}
		} catch (IOException | ProcessingException e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public void getSchema(Class<?> type, OutputStream outputStream) throws SerializationException {
		try {
			JsonFactory jsonFactory = new JsonFactory();
			JsonGenerator jsonGenerator = jsonFactory.createGenerator(outputStream);

			SchemaWriter schemaWriter = new SchemaWriter();
			schemaWriter.jsonGenerator = jsonGenerator;
			schemaWriter.element = new B1AnalyzerGetter().analyse(type);
			schemaWriter.write();

			jsonGenerator.flush();
			jsonGenerator.close();
		} catch (IOException e) {
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
	public Object deserialize(InputStream inputStream, ICompany company) throws SerializationException {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode rootNode = mapper.readTree(inputStream);
			JsonNode jsonNode = rootNode.path("type");
			if (jsonNode.isMissingNode() || B1DataConvert.isNullOrEmpty(jsonNode.textValue())) {
				throw new IndexOutOfBoundsException("type node");
			}
			String className = jsonNode.textValue();
			Element[] classKeys = this.getEntityKeys(className, company);
			if (classKeys != null && classKeys.length > 0) {
				// 如果有主键值，则更新数据
				Object[] keyValues = new Object[classKeys.length];
				for (int i = 0; i < classKeys.length; i++) {
					Element element = classKeys[i];
					jsonNode = rootNode.path(this.nameElement(element.getName()));
					if (jsonNode.isMissingNode()) {
						break;
					}
					if (B1DataConvert.isNullOrEmpty(jsonNode.asText())) {
						break;
					}
					keyValues[i] = this.nodeValue(rootNode.path(this.nameElement(classKeys[i].getName())),
							element.getType());
				}
				Object data = this.getEntity(className, keyValues, company);
				if (data != null) {
					this.deserialize(data, rootNode, getElement(data.getClass()));
					return data;
				}
			}
			ElementRoot element;
			Object data;
			try {
				Method method = SBOCOMUtil.class.getMethod("new" + className, ICompany.class);
				data = method.invoke(null, company);
			} catch (NoSuchMethodException e) {
				Method method = SBOCOMUtil.class.getMethod("new" + className + "sService", ICompanyService.class);
				data = method.invoke(null, company.getCompanyService());
				if (data == null) {
					throw new SerializationException(I18N.prop("msg_unrecognized_data", className));
				}
				method = data.getClass().getMethod("getDataInterface", Integer.class);
				data = method.invoke(data, Enumeration.valueOf(data.getClass()));
				// com组件代理对象转为一般类
				Class<?> clazz = Class.forName(String.format("com.sap.smb.sbo.api.%s", className));
				if (clazz == null) {
					throw new SerializationException(I18N.prop("msg_unrecognized_data", className));
				}
				Constructor<?> constructor = clazz.getConstructor(Object.class);
				data = constructor.newInstance(data);
			}
			if (data == null) {
				throw new SerializationException(I18N.prop("msg_unrecognized_data", className));
			}
			element = getElement(data.getClass());
			this.deserialize(data, rootNode, element);
			return data;
		} catch (Exception e) {
			throw new SerializationException(e);
		}

	}

	protected void deserialize(Object data, JsonNode rootNode, Element rootElement) throws SerializationException {
		Iterator<Entry<String, JsonNode>> nodes = rootNode.fields();
		while (nodes.hasNext()) {
			Entry<String, JsonNode> node = nodes.next();
			if ("type".equals(node.getKey())) {
				continue;
			}
			Element element = rootElement.getChilds().firstOrDefault(c -> c.getName().equalsIgnoreCase(node.getKey()));
			if (element == null) {
				Logger.log(MessageLevel.DEBUG, "b1 serializer: not found [%s]'s property [%s].", rootElement.getName(),
						node.getKey());
				continue;
			}
			if (element.isCollection()) {
				try {
					if (node.getValue().isArray()) {
						Method method = data.getClass().getMethod("get" + element.getName());
						Object cData = method.invoke(data);
						/*
						 * method = cData.getClass().getMethod("getCount"); Object count =
						 * method.invoke(cData); if (count instanceof Integer && (Integer) count > 0) {
						 * method = cData.getClass().getMethod("setCurrentLine", Integer.class);
						 * method.invoke(cData, (Integer) count - 1); }
						 */
						method = cData.getClass().getMethod("add");
						for (JsonNode cNode : node.getValue()) {
							this.deserialize(cData, cNode, element);
							method.invoke(cData);
						}
					} else {
						Logger.log(MessageLevel.WARN,
								"b1 serializer: element [%s] is collection, but node [%s] is not array.",
								element.getName(), node.getKey());
					}
				} catch (Exception e) {
					throw new SerializationException(e);
				}
			} else {
				try {
					Method method = data.getClass().getMethod("set" + element.getName(), element.getType());
					method.invoke(data, this.nodeValue(node.getValue(), element.getType()));
				} catch (NoSuchMethodException e) {
					Logger.log(MessageLevel.DEBUG, "b1 serializer: not found [%s]'s property [%s].",
							rootElement.getName(), node.getKey());
				} catch (Exception e) {
					throw new SerializationException(e);
				}
			}
		}
	}

	protected Object nodeValue(JsonNode node, Class<?> type) {
		if (type == Boolean.class) {
			return node.asBoolean();
		} else if (type == Double.class) {
			return node.asDouble();
		} else if (type == Integer.class) {
			return node.asInt();
		} else if (type == Long.class) {
			return node.asLong();
		} else if (type == Date.class) {
			return B1DataConvert.convert(Date.class, node.asText());
		} else {
			return node.asText();
		}
	}

	private class SchemaWriter {

		public static final String SCHEMA_VERSION = "http://json-schema.org/schema#";

		public SchemaWriter() {
			this.knownTypes = new HashMap<>();
			this.knownTypes.put("integer", "integer");
			this.knownTypes.put("long", "integer");
			this.knownTypes.put("short", "integer");
			this.knownTypes.put("float", "number");
			this.knownTypes.put("double", "number");
			this.knownTypes.put("boolean", "boolean");
			this.knownTypes.put("java.lang.Integer", "integer");
			this.knownTypes.put("java.lang.Long", "integer");
			this.knownTypes.put("java.lang.Short", "integer");
			this.knownTypes.put("java.math.BigInteger", "integer");
			this.knownTypes.put("java.lang.Float", "number");
			this.knownTypes.put("java.lang.Double", "number");
			this.knownTypes.put("java.math.BigDecimal", "number");
			this.knownTypes.put("java.lang.Boolean", "boolean");
			this.knownTypes.put("java.lang.String", "string");
			this.knownTypes.put("java.lang.Character", "string");
		}

		public JsonGenerator jsonGenerator;
		public ElementRoot element;
		protected Map<String, String> knownTypes;

		public void write() throws JsonGenerationException, IOException {
			this.jsonGenerator.writeStartObject();
			this.jsonGenerator.writeStringField("$schema", SCHEMA_VERSION);
			this.jsonGenerator.writeStringField("type", "object");
			this.jsonGenerator.writeFieldName("properties");
			this.jsonGenerator.writeStartObject();
			this.jsonGenerator.writeFieldName("type");
			this.jsonGenerator.writeStartObject();
			this.jsonGenerator.writeStringField("type", "string");
			this.jsonGenerator.writeStringField("pattern", this.element.getName());
			this.jsonGenerator.writeEndObject();
			for (Element item : this.element.getChilds()) {
				this.write(this.jsonGenerator, item);
			}
			this.jsonGenerator.writeEndObject();
			this.jsonGenerator.writeEndObject();
		}

		protected void write(JsonGenerator jsonGenerator, Element element) throws JsonGenerationException, IOException {
			if (element.isCollection()) {
				jsonGenerator.writeFieldName(B1SerializerJson.this.nameElement(element.getWrapper()));
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "array");
				jsonGenerator.writeFieldName("items");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "object");
				jsonGenerator.writeFieldName("properties");
				jsonGenerator.writeStartObject();
				for (Element item : element.getChilds()) {
					this.write(jsonGenerator, item);
				}
				jsonGenerator.writeEndObject();
				jsonGenerator.writeEndObject();
				jsonGenerator.writeEndObject();
			} else {
				jsonGenerator.writeFieldName(B1SerializerJson.this.nameElement(element.getName()));
				jsonGenerator.writeStartObject();
				String typeName = this.knownTypes.get(element.getType().getName());
				if (typeName != null) {
					// 已知类型
					jsonGenerator.writeStringField("type", typeName);
				} else if (element.getType().isEnum()) {
					// 枚举类型
					jsonGenerator.writeStringField("type", "string");
					jsonGenerator.writeArrayFieldStart("enum");
					for (Object enumItem : element.getType().getEnumConstants()) {
						if (enumItem instanceof Enum<?>) {
							// 枚举值（比对枚举索引）
							Enum<?> itemValue = (Enum<?>) enumItem;
							jsonGenerator.writeString(itemValue.name());
						}
					}
					jsonGenerator.writeEndArray();
				} else if (element.getType().equals(Date.class)) {
					// 日期类型
					jsonGenerator.writeStringField("type", "string");
					// 格式：2000-01-01 or 2000-01-01T00:00:00
					jsonGenerator.writeStringField("pattern",
							"^|[0-9]{4}-[0-1][0-9]-[0-3][0-9]|[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$");
				} else {
					jsonGenerator.writeStringField("type", "object");
					jsonGenerator.writeFieldName("properties");
					jsonGenerator.writeStartObject();
					for (Element item : element.getChilds()) {
						this.write(jsonGenerator, item);
					}
					jsonGenerator.writeEndObject();
				}
				jsonGenerator.writeEndObject();
			}
		}
	}

	@Override
	protected void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element) {
		try {
			JsonFactory jsonFactory = new JsonFactory();
			JsonGenerator jsonGenerator = jsonFactory.createGenerator(outputStream);

			DataWriter dataWriter = new DataWriter();
			dataWriter.jsonGenerator = jsonGenerator;
			dataWriter.element = element;
			dataWriter.source = data;
			dataWriter.write();

			jsonGenerator.flush();
			jsonGenerator.close();
		} catch (IOException e) {
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

		public JsonGenerator jsonGenerator;
		public ElementRoot element;
		public Object source;

		public void write() throws JsonGenerationException, IOException {
			this.jsonGenerator.writeStartObject();
			this.jsonGenerator.writeStringField("type", this.element.getName());
			for (Element item : this.element.getChilds()) {
				this.write(item, this.source);
			}
			this.jsonGenerator.writeEndObject();
		}

		private void write(Element element, Object data) throws JsonGenerationException, IOException {
			Object value = B1AnalyzerGetter.getValue(element, data);
			if (value == null) {
				return;
			}
			if (value instanceof String) {
				if (((String) value).isEmpty()) {
					return;
				}
			}
			String name = B1SerializerJson.this.nameElement(element.getName());
			if (element.getType() == String.class || element.getType() == Character.class || value instanceof String
					|| value instanceof Character) {
				this.jsonGenerator.writeStringField(name, B1DataConvert.toString(value));
			} else if (element.getType() == Date.class || value instanceof Date) {
				String tmp = B1DataConvert.toString(value);
				if (tmp != null) {
					this.jsonGenerator.writeStringField(name, tmp);
				}
			} else if (element.getType() == Boolean.class || value instanceof Boolean) {
				this.jsonGenerator.writeBooleanField(name, (boolean) value);
			} else if (element.getType() == Integer.class || value instanceof Integer) {
				this.jsonGenerator.writeNumberField(name, (Integer) value);
			} else if (element.getType() == Short.class || value instanceof Short) {
				this.jsonGenerator.writeNumberField(name, (Short) value);
			} else if (element.getType() == Long.class || value instanceof Long) {
				this.jsonGenerator.writeNumberField(name, (Long) value);
			} else if (element.getType() == Float.class || value instanceof Float) {
				this.jsonGenerator.writeNumberField(name, (Float) value);
			} else if (element.getType() == Double.class || value instanceof Double) {
				this.jsonGenerator.writeNumberField(name, (Double) value);
			} else if (element.getType() == BigDecimal.class || value instanceof BigDecimal) {
				this.jsonGenerator.writeNumberField(name, (BigDecimal) value);
			} else if (element.getType() == BigInteger.class || value instanceof BigInteger) {
				this.jsonGenerator.writeNumberField(name, ((BigInteger) value).longValue());
			} else if (element.isCollection()) {
				this.jsonGenerator.writeFieldName(B1SerializerJson.this.nameElement(element.getWrapper()));
				this.jsonGenerator.writeStartArray();
				for (Object itemValue : B1DataConvert.toIterable(value)) {
					this.jsonGenerator.writeStartObject();
					for (Element item : element.getChilds()) {
						this.write(item, itemValue);
					}
					this.jsonGenerator.writeEndObject();
				}
				this.jsonGenerator.writeEndArray();
			} else if (element.getType() == IFields.class) {
				this.jsonGenerator.writeFieldName(B1SerializerJson.this.nameElement(element.getWrapper()));
				this.jsonGenerator.writeStartArray();
				IFields fieldsValue = (IFields) value;
				for (int i = 0; i < fieldsValue.getCount(); i++) {
					this.jsonGenerator.writeFieldName(name);
					this.jsonGenerator.writeStartObject();
					for (Element item : element.getChilds()) {
						this.write(item, fieldsValue.item(i));
					}
					this.jsonGenerator.writeEndObject();
				}
				this.jsonGenerator.writeEndArray();
			} else if (element.getType() == IValidValues.class) {
				this.jsonGenerator.writeFieldName(B1SerializerJson.this.nameElement(element.getWrapper()));
				this.jsonGenerator.writeStartArray();
				IValidValues validValues = (IValidValues) value;
				for (int i = 0; i < validValues.getCount(); i++) {
					this.jsonGenerator.writeFieldName(name);
					this.jsonGenerator.writeStartObject();
					for (Element item : element.getChilds()) {
						this.write(item, validValues.item(i));
					}
					this.jsonGenerator.writeEndObject();
				}
				this.jsonGenerator.writeEndArray();
			} else {
				this.jsonGenerator.writeFieldName(name);
				this.jsonGenerator.writeStartObject();
				for (Element item : element.getChilds()) {
					this.write(item, value);
				}
				this.jsonGenerator.writeEndObject();
			}
		}
	}

}