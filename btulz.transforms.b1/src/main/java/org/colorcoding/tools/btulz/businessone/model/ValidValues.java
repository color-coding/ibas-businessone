package org.colorcoding.tools.btulz.businessone.model;

import org.colorcoding.tools.btulz.util.ArrayList;

public class ValidValues extends ArrayList<ValidValue> {

	private static final long serialVersionUID = 6333174238017767226L;

	public ValidValue create() {
		ValidValue item = new ValidValue();
		if (this.add(item))
			return item;
		return null;
	}

	public ValidValue firstOrDefault() {
		if (this.size() > 0) {
			return this.get(0);
		}
		return null;
	}
}
