package org.colorcoding.ibas.bobas.businessone.data;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.data.DateTime;

public class B1DataConvert {

	public static Object convert(Class<?> type, Object value) {
		if (type == Date.class) {
			return DataConvert.convert(DateTime.class, value);
		}
		return DataConvert.convert(type, value);
	}

	public static String toString(Object value) {
		if (value == null) {
			return "";
		}
		if (value.getClass() == Date.class) {
			return toString((Date) value);
		} else if (value.getClass() == DateTime.class) {
			return DataConvert.toString((DateTime) value);
		}
		return DataConvert.toString(value);
	}

	public static String toString(Date value) {
		return toString(value, DateTime.FORMAT_DATE);
	}

	public static String toString(Date value, String format) {
		if (value.getTime() == -2209190400000l) {
			return null;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(value);
	}

	public static final String METHOD_ITEM = "item";
	public static final String METHOD_SET_CURRENT_LINE = "setCurrentLine";
	public static final String METHOD_GET_COUNT = "getCount";

	public static Iterable<Object> toIterable(Object value) {
		return new Iterable<Object>() {

			@Override
			public Iterator<Object> iterator() {
				try {
					Method methodCount = value.getClass().getMethod(METHOD_GET_COUNT);
					int count = (int) methodCount.invoke(value);
					try {
						Method methodLine = value.getClass().getMethod(METHOD_SET_CURRENT_LINE, Integer.class);
						return new Iterator<Object>() {
							int index;

							@Override
							public boolean hasNext() {
								if (index < count) {
									return true;
								}
								return false;
							}

							@Override
							public Object next() {
								try {
									methodLine.invoke(value, index);
									index++;
									return value;
								} catch (Exception e) {
									throw new RuntimeException(e);
								}
							}
						};
					} catch (NoSuchMethodException e) {
						Method methodItem = value.getClass().getMethod(METHOD_ITEM, Object.class);
						return new Iterator<Object>() {
							int index;

							@Override
							public boolean hasNext() {
								if (index < count) {
									return true;
								}
								return false;
							}

							@Override
							public Object next() {
								try {
									index++;
									return methodItem.invoke(value, index - 1);
								} catch (Exception e) {
									throw new RuntimeException(e);
								}
							}
						};
					}
				} catch (Exception e) {
					return new Iterator<Object>() {

						@Override
						public boolean hasNext() {
							return false;
						}

						@Override
						public Object next() {
							return null;
						}
					};
				}
			}
		};
	}
}
