package org.colorcoding.ibas.bobas.businessone.data;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.core.Serializable;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "DataWrapping", namespace = MyConfiguration.NAMESPACE_B1_DATA)
@XmlRootElement(name = "DataWrapping", namespace = MyConfiguration.NAMESPACE_B1_DATA)
public class DataWrapping extends Serializable {

	private static final long serialVersionUID = -3389334644344905791L;

	public DataWrapping() {
	}

	public DataWrapping(String content) {
		this();
		this.setContent(content);
	}

	@XmlElement(name = "Content")
	private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
