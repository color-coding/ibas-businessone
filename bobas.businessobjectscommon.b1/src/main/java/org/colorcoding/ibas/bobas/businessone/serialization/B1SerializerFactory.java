package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.configuration.ConfigurableFactory;

public class B1SerializerFactory {

	/**
	 * 输出字符串类型，XML
	 */
	public final static String TYPE_XML = "xml";
	/**
	 * 输出化字符串类型，JSON
	 */
	public final static String TYPE_JSON = "json";

	private B1SerializerFactory() {
	}

	private volatile static SerializerManager instance;

	public synchronized static SerializerManager createManager() {
		if (instance == null) {
			synchronized (B1SerializerFactory.class) {
				if (instance == null) {
					instance = new Factory().create();
				}
			}
		}
		return instance;
	}

	private static class Factory extends ConfigurableFactory<SerializerManager> {

		public synchronized SerializerManager create() {
			return this.create(MyConfiguration.CONFIG_ITEM_SERIALIZATION_WAY, SerializerManager.class.getSimpleName());
		}

		@Override
		protected SerializerManager createDefault(String typeName) {
			return new SerializerManager();
		}

	}
}
