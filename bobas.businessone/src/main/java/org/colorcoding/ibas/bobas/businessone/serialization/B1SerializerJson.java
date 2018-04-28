package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.bobas.businessone.data.B1DataConvert;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IFields;
import com.sap.smb.sbo.api.IValidValues;

public class B1SerializerJson extends B1Serializer<JsonSchema> {

	public static final String SCHEMA_VERSION = "http://json-schema.org/schema#";

	public B1SerializerJson(ICompany b1Company) {
		super(b1Company);
	}

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
		try {
			JsonNode jsonData = JsonLoader.fromReader(new InputStreamReader(data));
			this.validate(schema, jsonData);
		} catch (IOException e) {
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
		try {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			this.getSchema(type, outputStream);
			JsonNode jsonSchema = JsonLoader
					.fromReader(new InputStreamReader(new ByteArrayInputStream(outputStream.toByteArray())));
			return JsonSchemaFactory.byDefault().getJsonSchema(jsonSchema);
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

	private class SchemaWriter {

		public static final String SCHEMA_VERSION = "http://json-schema.org/schema#";

		public SchemaWriter() {
			this.knownTypes = new HashMap<>();
			this.knownTypes.put("integer", "integer");
			this.knownTypes.put("short", "integer");
			this.knownTypes.put("boolean", "boolean");
			this.knownTypes.put("float", "number");
			this.knownTypes.put("double", "number");
			this.knownTypes.put("long", "number");
			this.knownTypes.put("java.lang.Integer", "integer");
			this.knownTypes.put("java.lang.Long", "integer");
			this.knownTypes.put("java.lang.String", "string");
			this.knownTypes.put("java.lang.Short", "integer");
			this.knownTypes.put("java.lang.Boolean", "boolean");
			this.knownTypes.put("java.lang.Float", "number");
			this.knownTypes.put("java.lang.Double", "number");
			this.knownTypes.put("java.lang.Character", "string");
			this.knownTypes.put("java.math.BigDecimal", "number");
			this.knownTypes.put("java.math.BigInteger", "number");
			this.knownTypes.put("org.colorcoding.ibas.bobas.data.Decimal", "number");
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
			if (element.getType() == String.class) {
				this.jsonGenerator.writeStringField(name, B1DataConvert.toString(value));
			} else if (element.getType() == Date.class) {
				String tmp = B1DataConvert.toString(value);
				if (tmp != null) {
					this.jsonGenerator.writeStringField(name, tmp);
				}
			} else if (element.getType() == Boolean.class) {
				this.jsonGenerator.writeBooleanField(name, (boolean) value);
			} else if (element.getType() == Integer.class) {
				this.jsonGenerator.writeNumberField(name, (Integer) value);
			} else if (element.getType() == Short.class) {
				this.jsonGenerator.writeNumberField(name, (Short) value);
			} else if (element.getType() == Long.class) {
				this.jsonGenerator.writeNumberField(name, (Long) value);
			} else if (element.getType() == Float.class) {
				this.jsonGenerator.writeNumberField(name, (Float) value);
			} else if (element.getType() == Double.class) {
				this.jsonGenerator.writeNumberField(name, (Double) value);
			} else if (element.getType() == BigDecimal.class) {
				this.jsonGenerator.writeNumberField(name, (BigDecimal) value);
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