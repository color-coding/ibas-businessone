package org.colorcoding.tools.btulz.businessone.transformer;

import java.lang.reflect.Method;

import org.colorcoding.tools.btulz.businessone.model.Domain;
import org.colorcoding.tools.btulz.businessone.model.Property;
import org.colorcoding.tools.btulz.businessone.model.ValidValue;
import org.colorcoding.tools.btulz.model.IBusinessObject;
import org.colorcoding.tools.btulz.model.IDomain;
import org.colorcoding.tools.btulz.model.IModel;
import org.colorcoding.tools.btulz.model.IProperty;
import org.colorcoding.tools.btulz.transformer.IXmlParser;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

class XmlParser implements IXmlParser {

	protected String xml_element_sign_domain = "Domain";
	protected String xml_element_sign_model = "Model";
	protected String xml_element_sign_property = "Property";
	protected String xml_element_sign_validvalue = "ValidValue";
	protected String xml_element_sign_businessobject = "BusinessObject";
	protected String xml_element_sign_businessobject_item = "RelatedBO";

	public IDomain parse(Node root) {
		if (root == null) {
			return null;
		}
		if (root.getNodeType() != Node.ELEMENT_NODE) {
			// 非元素节点不处理
			return null;
		}
		// 领域赋值
		IDomain domain = new Domain();
		this.setValues(root.getAttributes(), domain);
		for (int i = 0; i < root.getChildNodes().getLength(); i++) {
			Node node = root.getChildNodes().item(i);
			if (node.getNodeType() != Node.ELEMENT_NODE) {
				// 非元素节点不处理
				continue;
			}
			// 模型赋值
			if (node.getNodeName().equals(this.xml_element_sign_model)) {
				IModel model = domain.getModels().create();
				this.setValues(node.getAttributes(), model);
				for (int j = 0; j < node.getChildNodes().getLength(); j++) {
					Node childNode = node.getChildNodes().item(j);
					if (childNode.getNodeType() != Node.ELEMENT_NODE) {
						// 非元素节点不处理
						continue;
					}
					if (!childNode.getNodeName().equals(this.xml_element_sign_property)) {
						continue;
					}
					IProperty property = model.getProperties().create();
					this.setValues(childNode.getAttributes(), property);
					for (int k = 0; k < childNode.getChildNodes().getLength(); k++) {
						Node sonNode = childNode.getChildNodes().item(k);
						if (sonNode.getNodeType() != Node.ELEMENT_NODE) {
							// 非元素节点不处理
							continue;
						}
						if (!sonNode.getNodeName().equals(this.xml_element_sign_validvalue)) {
							continue;
						}
						if (property instanceof Property) {
							ValidValue validValue = ((Property) property).getValidValues().create();
							this.setValues(sonNode.getAttributes(), validValue);
						}
					}
				}
			}
			// 业务对象赋值
			if (node.getNodeName().equals(this.xml_element_sign_businessobject)) {
				IBusinessObject businessObject = domain.getBusinessObjects().create();
				this.setValues(node.getAttributes(), businessObject);
				this.setValues(node.getChildNodes(), businessObject);
			}
		}
		return domain;
	}

	protected void setValues(NodeList nodes, IBusinessObject businessObject) {
		for (int j = 0; j < nodes.getLength(); j++) {
			Node childNode = nodes.item(j);
			if (childNode.getNodeType() != Node.ELEMENT_NODE) {
				// 非元素节点不处理
				continue;
			}
			if (!childNode.getNodeName().equals(this.xml_element_sign_businessobject_item)) {
				continue;
			}
			IBusinessObject subBO = businessObject.getRelatedBOs().create();
			this.setValues(childNode.getAttributes(), subBO);
			this.setValues(childNode.getChildNodes(), subBO);
		}
	}

	protected void setValues(NamedNodeMap arrts, Object object) {
		if (arrts == null || object == null) {
			return;
		}
		Class<?> tmpClass = object.getClass();
		Method[] methods = tmpClass.getMethods();
		for (int i = 0; i < arrts.getLength(); i++) {
			Node childNode = arrts.item(i);
			if (childNode.getNodeType() != Node.ATTRIBUTE_NODE) {
				// 非属性节点不处理
				continue;
			}
			for (Method method : methods) {
				if (!method.getName().equals(String.format("set%s", arrts.item(i).getNodeName()))) {
					continue;
				}
				if (method.getParameterTypes().length != 1) {
					continue;
				}
				Class<?> type = method.getParameterTypes()[0];
				if (type.isInterface() || type.isLocalClass()) {
					continue;
				}
				try {
					method.invoke(object, this.convert(type, childNode.getNodeValue()));
				} catch (Exception e) {
					System.out.println(String.format("setting [%s]'s value occurred error %s",
							arrts.item(i).getNodeName(), e.getMessage()));
				}
				break;
			}
		}
	}
}
