package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.Serializer;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;
import org.xml.sax.InputSource;

public abstract class B1Serializer<S> extends Serializer<S> implements IB1Serializer<S> {

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
	public <T> T clone(T object, Class<?>... types) throws SerializationException {
		if (object == null) {
			return null;
		}
		Class<?> type = object.getClass();
		throw new SerializationException(I18N.prop("msg_bobas_data_type_not_support", type.getName()));
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
	public Object deserialize(InputSource inputSource, Class<?>... types) throws SerializationException {
		// b1对象不支持反序列化，建议直接分析字符串或自行定义对象
		throw new SerializationException(I18N.prop("msg_bobas_not_supported"));
	}

	protected abstract void serialize(Object data, OutputStream outputStream, boolean formated, ElementRoot element);

}
