package org.colorcoding.tools.btulz.businessone.transformer;

import org.colorcoding.tools.btulz.transformer.IXmlParser;

public class XmlTransformer extends org.colorcoding.tools.btulz.transformer.XmlTransformer {

	protected IXmlParser createXmlParser(String sign) {
		if (sign.equals("Domain")) {
			return new XmlParser();// 默认解释器
		}
		return null;
	}
}
