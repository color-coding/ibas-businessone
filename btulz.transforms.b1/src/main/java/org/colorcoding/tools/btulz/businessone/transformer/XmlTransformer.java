package org.colorcoding.tools.btulz.businessone.transformer;

import java.io.File;

import org.colorcoding.tools.btulz.businessone.model.Domain;
import org.colorcoding.tools.btulz.businessone.model.Model;
import org.colorcoding.tools.btulz.businessone.model.Property;
import org.colorcoding.tools.btulz.businessone.model.ValidValue;
import org.colorcoding.tools.btulz.model.IDomain;
import org.colorcoding.tools.btulz.model.data.emYesNo;
import org.colorcoding.tools.btulz.transformer.IXmlParser;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

public class XmlTransformer extends org.colorcoding.tools.btulz.transformer.XmlTransformer {

	protected IXmlParser createXmlParser(String sign) {
		if (sign.equals("Domain")) {
			return new XmlParser();// 默认解释器
		}
		return null;
	}

	@Override
	protected void save(File outFolder, IDomain domain) throws Exception {
		if (domain instanceof Domain) {
			this.save(outFolder, (Domain) domain);
		} else {
			super.save(outFolder, domain);
		}
	}

	protected void save(File outFolder, Domain domain) throws Exception {
		String fileName = this.getSaveFilePath(outFolder.getPath(), domain);
		Document document = DocumentHelper.createDocument();
		// 领域模型
		Element domainElement = document.addElement("Domain");
		this.writeElement(domain, domainElement);
		// 模型
		for (Model model : domain.getModels().ofType()) {
			Element modelElement = domainElement.addElement("Model");
			this.writeElement(model, modelElement);
			// 模型属性
			for (Property property : model.getProperties().ofType()) {
				Element propertyElement = modelElement.addElement("Property");
				this.writeElement(property, propertyElement);
				for (ValidValue validValue : property.getValidValues()) {
					Element validValueElement = propertyElement.addElement("ValidValue");
					this.writeElement(validValue, validValueElement);
				}
			}
		}
		OutputFormat xmlFormat = OutputFormat.createPrettyPrint();
		xmlFormat.setEncoding(XML_FILE_ENCODING);
		xmlFormat.setNewlines(true);
		xmlFormat.setIndent(true);
		xmlFormat.setIndent("  ");
		java.io.OutputStream out = new java.io.FileOutputStream(fileName);
		java.io.Writer wr = new java.io.OutputStreamWriter(out, XML_FILE_ENCODING);
		XMLWriter writer = new XMLWriter(wr, xmlFormat);
		writer.write(document);
		wr.close();
		out.close();
		writer.close();
	}

	private void writeElement(Domain domain, Element element) {
		element.addAttribute("Name", domain.getName());
	}

	private void writeElement(Model model, Element element) {
		element.addAttribute("Name", model.getName());
		element.addAttribute("Description", model.getDescription());
		element.addAttribute("ModelType", String.valueOf(model.getModelType()));
		element.addAttribute("System", String.valueOf(emYesNo.valueOf(model.isSystem())));
	}

	private void writeElement(Property property, Element element) {
		element.addAttribute("Name", property.getName());
		element.addAttribute("Description", property.getDescription());
		element.addAttribute("DataType", String.valueOf(property.getDataType()));
		element.addAttribute("DataSubType", String.valueOf(property.getDataSubType()));
		element.addAttribute("EditSize", String.valueOf(property.getEditSize()));
		if (property.getLinked() != null && !property.getLinked().isEmpty()) {
			element.addAttribute("Linked", property.getLinked());
		}
		if (property.getDefaultValue() != null && !property.getDefaultValue().isEmpty()) {
			element.addAttribute("DefaultValue", property.getDefaultValue());
		}
	}

	private void writeElement(ValidValue validValue, Element element) {
		element.addAttribute("Value", validValue.getValue());
		element.addAttribute("Description", validValue.getDescription());
	}
}
