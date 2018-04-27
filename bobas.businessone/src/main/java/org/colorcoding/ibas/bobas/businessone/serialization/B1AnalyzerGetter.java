package org.colorcoding.ibas.bobas.businessone.serialization;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;

import org.colorcoding.ibas.bobas.serialization.structure.AnalyzerGetter;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementMethod;

import com.sap.smb.sbo.api.IField;
import com.sap.smb.sbo.api.IFields;
import com.sap.smb.sbo.api.IValidValue;
import com.sap.smb.sbo.api.IValidValues;

public class B1AnalyzerGetter extends AnalyzerGetter {

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
		} else if (type == IFields.class) {
			String name = this.namedElement(method);
			return new ElementMethod(name, IField.class, name);
		} else if (type == IValidValues.class) {
			String name = this.namedElement(method);
			return new ElementMethod(name, IValidValue.class, name);
		} else {
			return super.createElement(method);
		}
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
