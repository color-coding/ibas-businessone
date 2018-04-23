package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.ValidateException;
import org.xml.sax.InputSource;

import com.sap.smb.sbo.api.ICompany;

public abstract class B1Serializer<S> implements IB1Serializer<S> {

	public B1Serializer(ICompany b1Company) {
		this.setB1Company(b1Company);
	}

	private ICompany b1Company;

	protected ICompany getB1Company() {
		return b1Company;
	}

	private void setB1Company(ICompany b1Company) {
		this.b1Company = b1Company;
	}

	@Override
	public <T> T clone(T arg0, Class<?>... arg1) throws SerializationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void validate(Class<?> type, InputStream data) throws ValidateException {
		this.validate(this.getSchema(type), data);
	}

	@Override
	public void validate(S schema, String data) throws ValidateException {
		this.validate(schema, new ByteArrayInputStream(data.getBytes()));
	}

	@Override
	public void validate(Class<?> type, String data) throws ValidateException {
		this.validate(type, new ByteArrayInputStream(data.getBytes()));
	}

	@Override
	public void serialize(Object object, OutputStream outputStream, Class<?>... types) throws SerializationException {
		this.serialize(object, outputStream,
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_FORMATTED_OUTPUT, false), types);
	}

	@Override
	public Object deserialize(String data, Class<?>... types) throws SerializationException {
		return this.deserialize(new ByteArrayInputStream(data.getBytes()), types);
	}

	@Override
	public Object deserialize(InputStream inputStream, Class<?>... types) throws SerializationException {
		try {
			return this.deserialize(new InputSource(inputStream), types);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
				}
			}
		}
	}

	@Override
	public DataWrapping wrap(String xmlData) throws SerializationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public abstract void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types);

	@Override
	public abstract Object deserialize(InputSource inputSource, Class<?>... types) throws SerializationException;

	@Override
	public abstract void validate(S schema, InputStream data) throws ValidateException;

	@Override
	public abstract S getSchema(Class<?> type) throws SerializationException;
}
