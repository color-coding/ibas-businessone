package org.colorcoding.tools.btulz.businessone.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.colorcoding.tools.btulz.model.IDomain;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "Domain", namespace = "http://colorcoding.org/btulz/b1")
public class Domain extends org.colorcoding.tools.btulz.model.Domain {

	public Domain() {
		this.models = new Models();
	}

	@XmlElement(name = "Model", type = Model.class, required = false)
	private Models models;

	@Override
	public Models getModels() {
		if (this.models == null) {
			this.models = new Models();
		}
		return this.models;
	}

	@Override
	public IDomain clone(boolean noChilds) {
		if (noChilds) {
			Domain domain = new Domain();
			domain.setName(this.getName());
			domain.setDescription(this.getDescription());
			domain.setShortName(this.getShortName());
			return domain;
		}
		return this.clone();
	}
}
