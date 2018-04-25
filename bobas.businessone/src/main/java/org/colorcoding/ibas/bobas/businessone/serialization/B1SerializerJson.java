package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.bobas.serialization.SerializationElement;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.xml.sax.InputSource;

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
import com.sap.smb.sbo.api.IValidValue;
import com.sap.smb.sbo.api.IValidValues;

public class B1SerializerJson extends B1Serializer<JsonSchema> {

	public static final String SCHEMA_VERSION = "http://json-schema.org/schema#";

	public B1SerializerJson(ICompany b1Company) {
		super(b1Company);
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
	protected String nameElement(String name) {
		name = super.nameElement(name);
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
		JsonFactory jsonFactory = new JsonFactory();
		try {
			JsonGenerator jsonGenerator = jsonFactory.createGenerator(outputStream);
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("$schema", SCHEMA_VERSION);
			jsonGenerator.writeStringField("type", "object");
			jsonGenerator.writeFieldName("properties");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeFieldName("type");
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("type", "string");
			jsonGenerator.writeStringField("pattern", type.getSimpleName());
			jsonGenerator.writeEndObject();
			this.createSchemaElement(jsonGenerator, type);
			jsonGenerator.writeEndObject();
			jsonGenerator.writeEndObject();
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

	protected void createSchemaElement(JsonGenerator jsonGenerator, Class<?> type)
			throws JsonGenerationException, IOException {
		for (SerializationElement item : this.getSerializedElements(type, true)) {
			if (type.equals(item.getType())) {
				// 子项是自身，不做处理
				continue;
			}
			jsonGenerator.writeFieldName(
					item.getWrapper() != null && !item.getWrapper().isEmpty() ? item.getWrapper() : item.getName());
			jsonGenerator.writeStartObject();
			if (this.getKnownTyps().containsKey(item.getType().getName())) {
				// 已知类型
				jsonGenerator.writeStringField("type", this.getKnownTyps().get(item.getType().getName()));
			} else if (item.getType().isEnum()) {
				// 枚举类型
				jsonGenerator.writeStringField("type", "string");
				jsonGenerator.writeArrayFieldStart("enum");
				for (Object enumItem : item.getType().getEnumConstants()) {
					if (enumItem instanceof Enum<?>) {
						// 枚举值（比对枚举索引）
						Enum<?> itemValue = (Enum<?>) enumItem;
						jsonGenerator.writeString(itemValue.name());
					}
				}
				jsonGenerator.writeEndArray();
			} else if (item.getType().equals(Date.class)) {
				// 日期类型
				jsonGenerator.writeStringField("type", "string");
				// 格式：2000-01-01 or 2000-01-01T00:00:00
				jsonGenerator.writeStringField("pattern",
						"^|[0-9]{4}-[0-1][0-9]-[0-3][0-9]|[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$");
			} else if (item.getType().equals(IFields.class)) {
				jsonGenerator.writeStringField("type", "array");
				jsonGenerator.writeFieldName("items");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "object");
				jsonGenerator.writeFieldName("properties");
				jsonGenerator.writeStartObject();
				// 自定义字段
				jsonGenerator.writeFieldName("name");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "string");
				jsonGenerator.writeEndObject();
				jsonGenerator.writeFieldName("description");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "string");
				jsonGenerator.writeEndObject();
				jsonGenerator.writeFieldName("value");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "object");
				jsonGenerator.writeEndObject();
				// 自定义字段
				jsonGenerator.writeEndObject();
				jsonGenerator.writeEndObject();
			} else if (item.getType().equals(IValidValues.class)) {
				jsonGenerator.writeStringField("type", "array");
				jsonGenerator.writeFieldName("items");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "object");
				jsonGenerator.writeFieldName("properties");
				jsonGenerator.writeStartObject();
				this.createSchemaElement(jsonGenerator, IValidValue.class);
				jsonGenerator.writeEndObject();
				jsonGenerator.writeEndObject();
			} else if (item.getWrapper() != null && !item.getWrapper().isEmpty()) {
				jsonGenerator.writeStringField("type", "array");
				jsonGenerator.writeFieldName("items");
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("type", "object");
				jsonGenerator.writeFieldName("properties");
				jsonGenerator.writeStartObject();
				this.createSchemaElement(jsonGenerator, item.getType());
				jsonGenerator.writeEndObject();
				jsonGenerator.writeEndObject();
			} else {
				jsonGenerator.writeStringField("type", "object");
				jsonGenerator.writeFieldName("properties");
				jsonGenerator.writeStartObject();
				this.createSchemaElement(jsonGenerator, item.getType());
				jsonGenerator.writeEndObject();
			}
			jsonGenerator.writeEndObject();
		}
	}

	private Map<String, String> knownTypes;

	public Map<String, String> getKnownTyps() {
		if (this.knownTypes == null) {
			this.knownTypes = new HashMap<>();
			this.knownTypes.put("integer", "integer");
			this.knownTypes.put("short", "integer");
			this.knownTypes.put("boolean", "boolean");
			this.knownTypes.put("float", "number");
			this.knownTypes.put("double", "number");
			this.knownTypes.put("java.lang.Integer", "integer");
			this.knownTypes.put("java.lang.String", "string");
			this.knownTypes.put("java.lang.Short", "integer");
			this.knownTypes.put("java.lang.Boolean", "boolean");
			this.knownTypes.put("java.lang.Float", "number");
			this.knownTypes.put("java.lang.Double", "number");
			this.knownTypes.put("java.lang.Character", "string");
			this.knownTypes.put("java.math.BigDecimal", "number");
		}
		return this.knownTypes;
	}

	@Override
	public void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types) {

	}

	@Override
	public Object deserialize(InputSource inputSource, Class<?>... types) throws SerializationException {
		return null;
	}

}
