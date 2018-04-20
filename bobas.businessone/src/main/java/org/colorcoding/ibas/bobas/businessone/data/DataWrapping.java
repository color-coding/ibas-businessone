package org.colorcoding.ibas.bobas.businessone.data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.colorcoding.ibas.bobas.businessone.MyConfiguration;
import org.colorcoding.ibas.bobas.serialization.Serializable;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "DataWrapping", namespace = MyConfiguration.NAMESPACE_B1_DATA)
public class DataWrapping extends Serializable {

	public DataWrapping() {
	}

	public DataWrapping(String content) {
		this();
		this.setContent(content);
	}

	private static final long serialVersionUID = -3389334644344905791L;

	@XmlElement(name = "Content")
	private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
