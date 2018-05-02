package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.configuration.ConfigurableFactory;

import com.sap.smb.sbo.api.ICompany;

public class B1SerializerFactory extends ConfigurableFactory<IB1SerializerManager> {
	private B1SerializerFactory() {
	}

	private volatile static B1SerializerFactory instance;

	public synchronized static B1SerializerFactory create() {
		if (instance == null) {
			synchronized (B1SerializerFactory.class) {
				if (instance == null) {
					instance = new B1SerializerFactory();
				}
			}
		}
		return instance;
	}

	@Override
	protected IB1SerializerManager createDefault(String typeName) {
		return new IB1SerializerManager() {

			@Override
			public IB1Serializer<?> create(ICompany b1Company, String sign) {
				if (TYPE_XML.equalsIgnoreCase(sign)) {
					return new B1SerializerXml(b1Company);
				}
				return new B1SerializerJson(b1Company);
			}
		};
	}

	private volatile static IB1SerializerManager manager = null;

	public synchronized IB1SerializerManager createManager() {
		if (manager == null) {
			manager = this.create(MyConfiguration.CONFIG_ITEM_B1_SERIALIZATION_WAY, "B1SerializerManager");
		}
		return manager;
	}
}
