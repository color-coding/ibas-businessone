package org.colorcoding.ibas.bobas.businessone.data;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.data.DataTable;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.IDataTableColumn;
import org.colorcoding.ibas.bobas.data.IDataTableRow;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;

import com.sap.smb.sbo.api.IField;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.wrapper.com.ComFailException;

public class B1DataConvert {

	/**
	 * 判断字符串是否为空值
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isNullOrEmpty(String value) {
		if (value == null) {
			return true;
		}
		if (value.isEmpty()) {
			return true;
		}
		return false;
	}

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

	public static DataTable toDataTable(IRecordset recordset) {
		DataTable dataTable = new DataTable();
		// 创建列
		for (int i = 0; i < recordset.getFields().getCount(); i++) {
			IField field = recordset.getFields().item(i);
			IDataTableColumn column = dataTable.getColumns().create();
			column.setName(field.getName());
			column.setDataType(typeOf(field.getType(), field.getSubType()));
			column.setDescription(field.getDescription());
		}
		// 赋值
		while (!recordset.isEoF()) {
			IDataTableRow row = dataTable.getRows().create();
			for (int i = 0; i < recordset.getFields().getCount(); i++) {
				IField field = recordset.getFields().item(i);
				if (dataTable.getColumns().get(i).getDataType() == Double.class) {
					try {
						row.setValue(i, field.getValueDouble());
					} catch (Exception e) {
						row.setValue(i, field.getValue());
					}
				} else {
					row.setValue(i, field.getValue());
				}
			}
			recordset.moveNext();
		}
		// 游标开始
		recordset.moveFirst();
		return dataTable;
	}

	public static Class<?> typeOf(Integer type, Integer subType) {
		if (Integer.compare(type, SBOCOMConstants.BoFieldTypes_db_Alpha) == 0) {
			return String.class;
		} else if (Integer.compare(type, SBOCOMConstants.BoFieldTypes_db_Date) == 0) {
			if (Integer.compare(subType, SBOCOMConstants.BoFldSubTypes_st_Time) == 0) {
				return Integer.class;
			}
			return Date.class;
		} else if (Integer.compare(type, SBOCOMConstants.BoFieldTypes_db_Float) == 0) {
			return Double.class;
		} else if (Integer.compare(type, SBOCOMConstants.BoFieldTypes_db_Memo) == 0) {
			return String.class;
		} else if (Integer.compare(type, SBOCOMConstants.BoFieldTypes_db_Numeric) == 0) {
			return Integer.class;
		}
		return Object.class;
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
								} catch (InvocationTargetException e) {
									if (e.getCause() instanceof ComFailException) {
										if (e.getCause().getMessage() != null && e.getCause().getMessage()
												.contains("Description: Invalid row number")) {
											Logger.log(MessageLevel.WARN, e);
											index++;
											return null;
										}
									}
									throw new RuntimeException(e);
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
								} catch (InvocationTargetException e) {
									if (e.getCause() instanceof ComFailException) {
										if (e.getCause().getMessage() != null && e.getCause().getMessage()
												.contains("Description: Invalid row number")) {
											Logger.log(MessageLevel.WARN, e);
											index++;
											return null;
										}
									}
									throw new RuntimeException(e);
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
