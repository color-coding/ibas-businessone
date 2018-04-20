package org.colorcoding.ibas.bobas.businessone.serialization;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;

public class B1Serializer {
	public static DataWrapping wrap(String data) {
		return new DataWrapping(data);
	}
}
