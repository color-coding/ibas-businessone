package org.colorcoding.tools.btulz.businessone.model;

import java.util.Iterator;

import org.colorcoding.tools.btulz.model.IProperty;

public class Properties extends org.colorcoding.tools.btulz.model.Properties {

	private static final long serialVersionUID = -1890627190798162603L;

	@Override
	public IProperty create() {
		IProperty item = new Property();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	public Iterable<Property> ofType() {
		return new Iterable<Property>() {
			@Override
			public Iterator<Property> iterator() {
				return new Iterator<Property>() {
					int index = -1;

					@Override
					public boolean hasNext() {
						for (int i = index + 1; i < Properties.this.size(); i++) {
							Object next = Properties.this.get(i);
							if (next instanceof Property) {
								return true;
							}
						}
						return false;
					}

					@Override
					public Property next() {
						for (int i = index + 1; i < Properties.this.size(); i++) {
							Object next = Properties.this.get(i);
							if (next instanceof Property) {
								index = i;
								return (Property) next;
							}
						}
						return null;
					}
				};
			}

		};
	}
}
