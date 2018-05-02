package org.colorcoding.tools.btulz.businessone.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.NONE)
public class Property extends org.colorcoding.tools.btulz.model.Property {

	public Property() {
		this.validValues = new ValidValues();
	}

	@XmlAttribute(name = "System")
	private boolean system;

	public boolean isSystem() {
		return system;
	}

	public void setSystem(boolean system) {
		this.system = system;
	}

	@XmlAttribute(name = "DefaultValue")
	private String defaultValue;

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	@XmlElement(name = "ValidValue", type = ValidValue.class, required = false)
	private ValidValues validValues;

	public ValidValues getValidValues() {
		if (this.validValues == null) {
			this.validValues = new ValidValues();
		}
		return validValues;
	}

}
