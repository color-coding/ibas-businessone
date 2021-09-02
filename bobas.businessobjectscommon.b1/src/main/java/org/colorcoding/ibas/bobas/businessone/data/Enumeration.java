package org.colorcoding.ibas.bobas.businessone.data;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.colorcoding.ibas.bobas.data.DataConvertException;
import org.colorcoding.ibas.bobas.data.KeyValue;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;

import com.sap.smb.sbo.api.SBOCOMConstants;

public class Enumeration {

	public static final String GROUP_BO_OBJECT_TYPES = "BoObjectTypes";
	public static final String GROUP_SERVICE_DATA_INTERFACES = "sServiceDataInterfaces";

	private volatile static Map<String, List<KeyValue>> valueMap;

	private static Map<String, List<KeyValue>> getValueMap() {
		if (valueMap == null) {
			synchronized (Enumeration.class) {
				if (valueMap == null) {
					valueMap = createValueMap();
				}
			}
		}
		return valueMap;
	}

	protected static Map<String, List<KeyValue>> createValueMap() {
		Map<String, List<KeyValue>> valueMap = new HashMap<>();
		for (Field field : SBOCOMConstants.class.getDeclaredFields()) {
			int index = field.getName().indexOf("_");
			if (index < 0) {
				continue;
			}
			try {
				String group = field.getName().substring(0, index);
				String name = field.getName().substring(index + 1);
				if (name != null && name.startsWith("o")) {
					name = name.substring(1);
				}
				Object value = field.get(SBOCOMConstants.class);
				if (!(value instanceof Integer)) {
					continue;
				}
				List<KeyValue> keyValues = valueMap.get(group);
				if (keyValues == null) {
					keyValues = new ArrayList<>();
					valueMap.put(group, keyValues);
				}
				keyValues.add(new KeyValue(name, value));
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return valueMap;
	}

	/**
	 * 转换值
	 * 
	 * @param type  类型
	 * @param value 字符
	 * @return 枚举值
	 */
	public static Integer valueOf(String type, String value) {
		List<KeyValue> values = getValueMap().get(type);
		if (values != null) {
			if (value.startsWith("*")) {
				value = value.substring(1, value.length());
				for (KeyValue keyValue : values) {
					if (keyValue.getKey().endsWith(value)) {
						return (Integer) keyValue.getValue();
					}
				}
			} else if (value.endsWith("*")) {
				value = value.substring(0, value.length() - 1);
				for (KeyValue keyValue : values) {
					if (keyValue.getKey().startsWith(value)) {
						return (Integer) keyValue.getValue();
					}
				}
			} else {
				for (KeyValue keyValue : values) {
					if (keyValue.getKey().equals(value)) {
						return (Integer) keyValue.getValue();
					}
				}
			}
		}
		throw new DataConvertException(I18N.prop("msg_bobas_value_can_not_be_resolved", type + " - " + value));
	}

	public static Integer valueOf(emYesNo value) {
		if (value == emYesNo.YES) {
			return SBOCOMConstants.BoYesNoEnum_tYES;
		} else {
			return SBOCOMConstants.BoYesNoEnum_tNO;
		}
	}

	public static Integer valueOf(boolean value) {
		if (value) {
			return SBOCOMConstants.BoYesNoEnum_tYES;
		} else {
			return SBOCOMConstants.BoYesNoEnum_tNO;
		}
	}

	/**
	 * 对象类型编码
	 * 
	 * @param type 类型
	 * @return
	 */
	public static Integer valueOf(Class<?> type) {
		if (type != null && type.getName().startsWith("com.sap.smb.sbo.api.")) {
			String name = type.getSimpleName();
			if (type.isInterface() && name.startsWith("I")) {
				name = name.substring(1);
				return valueOf(GROUP_BO_OBJECT_TYPES, String.format("o%s", name));
			} else if (!type.isInterface() && name.endsWith("sService")) {
				name = name.substring(0, name.indexOf("sService"));
				return valueOf(name + GROUP_SERVICE_DATA_INTERFACES, String.format("*%s", name));
			}
		}
		throw new DataConvertException(
				I18N.prop("msg_bobas_data_type_not_support", type == null ? "UNKNOWN" : type.getName()));
	}

	/**
	 * 对象类型名称
	 * 
	 * @param type  组
	 * @param value 类型id
	 * @return
	 */
	public static String nameOf(String type, Integer value) {
		List<KeyValue> values = getValueMap().get(type);
		if (values != null) {
			for (KeyValue keyValue : values) {
				if (keyValue.getValue().equals(value)) {
					return (String) keyValue.getKey();
				}
			}
		}
		return String.valueOf(value);
	}

	/**
	 * 对象类型名称
	 * 
	 * @param type  组
	 * @param value 类型id
	 * @return
	 */
	public static String nameOf(String type, String value) {
		try {
			return nameOf(type, Integer.valueOf(value));
		} catch (NumberFormatException e) {
			return value;
		}
	}
}
