package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.SerializationException;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlFactory;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class B1Serializer implements IB1Serializer {

	public static IB1Serializer create() {
		return new B1Serializer();
	}

	private XmlFactory xmlFactory;

	protected XmlFactory getXmlFactory() {
		if (this.xmlFactory == null) {
			this.xmlFactory = new XmlMapper().getFactory();
		}
		return xmlFactory;
	}

	protected JsonFactory getJsonFactory() {
		if (this.jsonFactory == null) {
			this.jsonFactory = new ObjectMapper().getFactory();
		}
		return jsonFactory;
	}

	private JsonFactory jsonFactory;

	@Override
	public void serialize(String xmlData, OutputStream outputStream) throws SerializationException {
		try {
			JsonParser jsonParser = this.getXmlFactory().createParser(xmlData);
			JsonGenerator jsonGenerator = this.getJsonFactory().createGenerator(outputStream);
			while (jsonParser.nextToken() != null) {
				jsonGenerator.copyCurrentEvent(jsonParser);
			}
			jsonParser.close();
			jsonGenerator.close();
		} catch (Exception e) {
			throw new SerializationException(e);
		}
	}

	@Override
	public String serialize(String xmlData) throws SerializationException {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		this.serialize(xmlData, outputStream);
		return outputStream.toString();
	}

	@Override
	public DataWrapping wrap(String xmlData) throws SerializationException {
		return new DataWrapping(this.serialize(xmlData));
	}

	@Override
	public <T> T deserialize(String data, Class<T> type) throws SerializationException {
		// TODO Auto-generated method stub
		return null;
	}

}
