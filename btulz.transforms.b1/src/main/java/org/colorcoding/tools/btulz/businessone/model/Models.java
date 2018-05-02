package org.colorcoding.tools.btulz.businessone.model;

import java.util.Iterator;

import org.colorcoding.tools.btulz.model.IModel;

public class Models extends org.colorcoding.tools.btulz.model.Models {

	private static final long serialVersionUID = -2452468122428645639L;

	public IModel create() {
		IModel model = new Model();
		if (this.add(model)) {
			return model;
		}
		return null;
	}

	public Iterable<Model> ofType() {
		return new Iterable<Model>() {
			@Override
			public Iterator<Model> iterator() {
				return new Iterator<Model>() {
					int index = -1;

					@Override
					public boolean hasNext() {
						for (int i = index + 1; i < Models.this.size(); i++) {
							Object next = Models.this.get(i);
							if (next instanceof Model) {
								return true;
							}
						}
						return false;
					}

					@Override
					public Model next() {
						for (int i = index + 1; i < Models.this.size(); i++) {
							Object next = Models.this.get(i);
							if (next instanceof Model) {
								index = i;
								return (Model) next;
							}
						}
						return null;
					}
				};
			}

		};
	}
}
