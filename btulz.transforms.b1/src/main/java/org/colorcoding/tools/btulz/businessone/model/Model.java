package org.colorcoding.tools.btulz.businessone.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.NONE)
public class Model extends org.colorcoding.tools.btulz.model.Model {

	public Model() {
		this.properties = new Properties();
	}

	@Override
	public String getMapped() {
		if (super.getMapped() == null) {
			return this.getName();
		}
		return super.getMapped();
	}

	@XmlAttribute(name = "System")
	private boolean system;

	public boolean isSystem() {
		return system;
	}

	public void setSystem(boolean system) {
		this.system = system;
	}

	@XmlElement(name = "Property", type = Property.class, required = false)
	private Properties properties;

	@Override
	public Properties getProperties() {
		if (this.properties == null) {
			this.properties = new Properties();
		}
		return this.properties;
	}
}
