package org.colorcoding.ibas.bobas.businessone.serialization;

import java.lang.reflect.Method;
import java.util.Collection;

import org.colorcoding.ibas.bobas.serialization.structure.AnalyzerGetter;

public class B1AnalyzerGetter extends AnalyzerGetter {

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
