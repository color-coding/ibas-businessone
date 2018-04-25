package org.colorcoding.ibas.bobas.businessone.serialization;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.data.Enumeration;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.serialization.SerializationElement;
import org.colorcoding.ibas.bobas.serialization.SerializationElements;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.Serializer;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDataBrowser;
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

	/**
	 * 判断是否为集合
	 * 
	 * @param type
	 * @return
	 */
	protected boolean isCollection(Class<?> type) {
		if (type.isArray()) {
			return true;
		}
		if (Collection.class.isAssignableFrom(type)) {
			return true;
		}
		int count = 0;
		for (Method method : type.getMethods()) {
			if (method.getName().equalsIgnoreCase("add")) {
				count++;
			}
			if (method.getName().equalsIgnoreCase("setCurrentLine")) {
				count++;
			}
		}
		if (count > 1) {
			return true;
		}
		return false;
	}

	protected String nameElement(String name) {
		if (name.startsWith("get") || name.startsWith("set")) {
			name = name.substring(3);
		}
		return name;
	}

	@Override
	protected List<SerializationElement> getSerializedElements(Class<?> type, boolean recursion) {
		if (type.isInterface()) {
			SerializationElements elements = new SerializationElements();// 类型为接口时
			if (recursion) {
				// 递归，先获取基类
				for (Class<?> item : type.getInterfaces()) {
					if (item.getName().startsWith("java.")) {
						// 基础类型不做处理
						continue;
					}
					elements.add(this.getSerializedElements(item, recursion));
				}
			}
			for (Method method : type.getMethods()) {
				if (!method.getName().startsWith("get")) {
					continue;
				}
				if (method.getReturnType() == null) {
					continue;
				}
				if (method.getParameterCount() != 0) {
					continue;
				}
				if (method.getName().equals("getCount")) {
					continue;
				}
				if (method.getName().equals("getAsXML")) {
					continue;
				}
				if (method.getName().equals("get_NewEnum")) {
					continue;
				}
				Class<?> elementType = method.getReturnType();
				if (elementType == IDataBrowser.class) {
					continue;
				}
				String elementName = this.nameElement(method.getName());
				if (elementName.isEmpty()) {
					continue;
				}
				if (this.isCollection(elementType)) {
					// 集合
					elements.add(new SerializationElement(elementName, elementName, elementType));
				} else {
					elements.add(new SerializationElement(elementName, elementType));
				}
			}
			return elements;
		}
		return super.getSerializedElements(type, recursion);
	}

	@Override
	public DataWrapping wrap(String xmlData) throws SerializationException {
		ByteArrayOutputStream outputStream = null;
		try {
			outputStream = new ByteArrayOutputStream();
			this.serialize(xmlData, outputStream);
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

}
