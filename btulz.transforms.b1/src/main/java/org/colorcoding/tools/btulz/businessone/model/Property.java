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

	@XmlAttribute(name = "Deletion")
	private boolean deletion;

	public boolean isDeletion() {
		return deletion;
	}

	public void setDeletion(boolean deletion) {
		this.deletion = deletion;
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

	@XmlAttribute(name = "LinkedSystemObject")
	private String linkedSystemObject;

	public String getLinkedSystemObject() {
		return linkedSystemObject;
	}

	public void setLinkedSystemObject(String linkedSystemObject) {
		this.linkedSystemObject = linkedSystemObject;
	}

	@XmlAttribute(name = "LinkedTable")
	private String linkedTable;

	public String getLinkedTable() {
		return linkedTable;
	}

	public void setLinkedTable(String linkedTable) {
		this.linkedTable = linkedTable;
	}

	@XmlAttribute(name = "LinkedUDO")
	private String linkedUDO;

	public String getLinkedUDO() {
		return linkedUDO;
	}

	public void setLinkedUDO(String linkedUDO) {
		this.linkedUDO = linkedUDO;
	}

}