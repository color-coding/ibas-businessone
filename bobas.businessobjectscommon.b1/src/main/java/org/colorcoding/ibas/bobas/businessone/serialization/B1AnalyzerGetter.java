package org.colorcoding.ibas.bobas.businessone.serialization;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;

import org.colorcoding.ibas.bobas.serialization.structure.AnalyzerGetter;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementMethod;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;

public class B1AnalyzerGetter extends AnalyzerGetter {

	public static Object getValue(Element element, Object value) {
		Method method = null;
		try {
			method = value.getClass().getMethod(METHOD_GET_PREFIX + element.getName());
			if (method == null) {
				method = value.getClass().getMethod(METHOD_IS_PREFIX + element.getName());
			}
			if (method != null) {
				return method.invoke(value);
			}
		} catch (Exception e) {
		}
		return null;
	}

	public B1AnalyzerGetter() {
		super();
		this.skipMethods = new ArrayList<>();
		this.skipMethods.add("get");
		this.skipMethods.add("isNull");
		this.skipMethods.add("getAsXML");
		this.skipMethods.add("getBrowser");
		this.skipMethods.add("get_NewEnum");
		this.skipMethods.add("getCount");
		this.skipMethods.add("getImportProcesses");
		this.skipMethods.add("getExportProcesses");
		this.skipMethods.add("getValueDate");
		this.skipMethods.add("getValueDouble");
		this.skipMethods.add("getValueFloat");
		this.skipMethods.add("getValueInteger");
		this.skipMethods.add("getValueString");
		this.skipMethods.add("getApprovalTemplates");
	}

	@Override
	protected Element createElement(Method method) {
		if (this.skipMethods != null) {
			if (this.skipMethods.contains(method.getName())) {
				return null;
			}
		}
		Class<?> type = method.getReturnType();
		if (this.isCollection(type)) {
			String name = this.namedElement(method);
			return new ElementMethod(name, type, name);
		} else if (this.hasItems(type)) {
			String name = this.namedElement(method);
			try {
				return new ElementMethod(name, type.getMethod("item", Object.class).getReturnType(), name);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		} else {
			return super.createElement(method);
		}
	}

	protected boolean hasItems(Class<?> type) {
		try {
			Method method = type.getMethod("item", Object.class);
			if (method == null) {
				return false;
			}
			Class<?> rType = method.getReturnType();
			if (rType == null) {
				return false;
			}
			if (!type.getSimpleName().startsWith(rType.getSimpleName())) {
				return false;
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public ElementRoot analyse(Class<?> type) {
		if (!type.isInterface()) {
			// 实体类，尝试转为接口
			String name = type.getName().substring(0, type.getName().lastIndexOf("."));
			name = "I" + type.getSimpleName();
			try {
				type = Class.forName(name);
			} catch (ClassNotFoundException e) {
			}
		}
		ElementRoot element = super.analyse(type);
		if (type.isInterface() && element.getName().startsWith("I")) {
			element.setName(element.getName().substring(1));
		}
		return element;
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

}
