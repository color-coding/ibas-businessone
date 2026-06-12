package org.colorcoding.ibas.bobas.businessone.serialization;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;

import org.colorcoding.ibas.bobas.serialization.structure.AnalyzerGetter;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementMethod;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;

public class B1AnalyzerGetter extends AnalyzerGetter {

	/**
	 * 获取元素的值
	 * <p>
	 * 通过反射调用get或is方法获取对象属性值
	 *
	 * @param element 元素定义
	 * @param value   目标对象
	 * @return 属性值，获取失败时返回null
	 */
	public static Object getValue(Element element, Object value) {
		try {
			Method method = value.getClass().getMethod(METHOD_GET_PREFIX + element.getName());
			return method.invoke(value);
		} catch (NoSuchMethodException e) {
			// get方法不存在，尝试is方法
			try {
				Method method = value.getClass().getMethod(METHOD_IS_PREFIX + element.getName());
				return method.invoke(value);
			} catch (Exception ex) {
				return null;
			}
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 构造函数，初始化需要跳过的方法列表
	 */
	public B1AnalyzerGetter() {
		super();
		this.skipMethods = new ArrayList<>();
		this.skipMethods.add("get");
		this.skipMethods.add("isNull");
		this.skipMethods.add("getAsXML");
		this.skipMethods.add("getXMLSchema");
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
		this.skipMethods.add("isBoF");
		this.skipMethods.add("isEoF");
		this.skipMethods.add("getCommand");
		this.skipMethods.add("getFixedSchema");
	}

	/**
	 * 创建元素定义
	 * <p>
	 * 根据方法返回类型判断是集合类型、包含item方法的类型还是普通类型，
	 * 并创建对应的元素定义。
	 *
	 * @param method 反射方法
	 * @return 元素定义，如果方法在跳过列表中则返回null
	 */
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

	/**
	 * 检查类型是否包含item方法
	 * <p>
	 * 用于判断B1的集合类型，如Lines、Rows等
	 *
	 * @param type 要检查的类型
	 * @return true表示包含item方法且返回类型与容器类型名称匹配
	 */
	protected boolean hasItems(Class<?> type) {
		try {
			Method method = type.getMethod("item", Object.class);
			// getMethod不会返回null，找不到时抛NoSuchMethodException
			Class<?> rType = method.getReturnType();
			// getReturnType()不会返回null
			if (!type.getSimpleName().startsWith(rType.getSimpleName())) {
				return false;
			}
			return true;
		} catch (NoSuchMethodException e) {
			return false;
		}
	}

	/**
	 * 分析类型并返回元素根节点
	 * <p>
	 * 如果传入的是实现类，会尝试转换为接口类型。
	 * 对于接口类型，会去掉名称前的"I"前缀。
	 *
	 * @param type 要分析的类型
	 * @return 元素根节点定义
	 */
	@Override
	public ElementRoot analyse(Class<?> type) {
		if (!type.isInterface()) {
			// 实体类，尝试转为接口
			String packageName = type.getName().substring(0, type.getName().lastIndexOf("."));
			String interfaceName = packageName + ".I" + type.getSimpleName();
			try {
				type = Class.forName(interfaceName);
			} catch (ClassNotFoundException e) {
				// 接口未找到，使用原始类型
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
		// 通过尝试获取特定方法来判断，避免遍历全部方法
		try {
			type.getMethod("add");
			type.getMethod("setCurrentLine", Integer.class);
			return true;
		} catch (NoSuchMethodException e) {
			return false;
		}
	}

}
