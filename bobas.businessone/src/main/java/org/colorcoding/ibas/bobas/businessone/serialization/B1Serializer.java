package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.Serializer;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;
import org.xml.sax.InputSource;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDocuments;

public abstract class B1Serializer<S> extends Serializer<S> implements IB1Serializer<S> {

	public B1Serializer(ICompany b1Company) {
		this.setB1Company(b1Company);
	}

	private ICompany b1Company;

	protected final ICompany getB1Company() {
		if (this.b1Company == null) {
			throw new SerializationException(I18N.prop("msg_b1_invalid_company"));
		}
		return b1Company;
	}

	private final void setB1Company(ICompany b1Company) {
		this.b1Company = b1Company;
	}

	@Override
	@SuppressWarnings("unchecked")
	public <T> T clone(T object, Class<?>... types) throws SerializationException {
		if (object == null) {
			return null;
		}
		Class<?> type = object.getClass();
		String folder = MyConfiguration.getTempFolder();
		if (!folder.endsWith(File.separator)) {
			folder += File.separator;
		}
		String file = String.format("%s%s.tmp", folder, UUID.randomUUID().toString());
		try {
			Method methodSaveXml = null;
			try {
				methodSaveXml = type.getMethod("saveXML", String.class);
			} catch (NoSuchMethodException e) {
				methodSaveXml = type.getMethod("toXMLFile", String.class);
			}
			if (methodSaveXml != null) {
				methodSaveXml.invoke(object, file);
				Integer objCode = -1;
				if (object instanceof IDocuments) {
					objCode = ((IDocuments) object).getDocType();
				} else {
					objCode = Enumeration.valueOf(type);
				}
				if (objCode != -1) {
					Logger.log(MessageLevel.DEBUG, "serializer: load b1 object [%s], data [%s].", objCode, file);
					return (T) this.getB1Company().getBusinessObjectFromXML(file, objCode);
				}
			}
		} catch (Exception e) {
			throw new SerializationException(e);
		} finally {
			File tmpFile = new File(file);
			if (tmpFile.isFile() && tmpFile.exists()) {
				tmpFile.delete();
			}
		}
		throw new SerializationException(I18N.prop("msg_bobas_data_type_not_support", type.getName()));
	}

	@Override
	public void serialize(Object object, OutputStream outputStream, boolean formated, Class<?>... types) {
		this.serialize(object, outputStream, formated, new B1AnalyzerGetter().analyse(object.getClass()));
	}

	@Override
	public <T> List<DataWrapping> wrap(T[] datas) throws SerializationException {
		List<DataWrapping> wrappings = new ArrayList<>();
		ElementRoot elementRoot = new B1AnalyzerGetter().analyse(datas.getClass().getComponentType());
		for (T data : datas) {
			wrappings.add(this.wrap(data, elementRoot));
		}
		return wrappings;
	}

	@Override
	public <T> DataWrapping wrap(T data) throws SerializationException {
		return this.wrap(data, new B1AnalyzerGetter().analyse(data.getClass()));
	}

	public <T> DataWrapping wrap(T data, ElementRoot element) throws SerializationException {
		ByteArrayOutputStream outputStream = null;
		try {
			outputStream = new ByteArrayOutputStream();
			this.serialize(data, outputStream, false, element);
			return new DataWrapping(outputStream.toString());
		} finally {
			try {
				if (outputStream != null)
					outputStream.close();
			} catch (IOException e) {
			}
		}
	}

	@Override
	public Object deserialize(InputSource inputSource, Class<?>... types) throws SerializationException {
		// b1对象不支持反序列化，建议直接分析字符串或自行定义对象
		throw new SerializationException(I18N.prop("msg_bobas_not_supported"));
	}

	protected abstract void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element);

}
