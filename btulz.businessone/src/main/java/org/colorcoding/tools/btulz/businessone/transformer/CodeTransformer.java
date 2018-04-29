package org.colorcoding.tools.btulz.businessone.transformer;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.colorcoding.ibas.bobas.businessone.serialization.B1AnalyzerGetter;
import org.colorcoding.ibas.bobas.serialization.structure.Element;
import org.colorcoding.ibas.bobas.serialization.structure.ElementRoot;
import org.colorcoding.tools.btulz.model.Domain;
import org.colorcoding.tools.btulz.model.IBusinessObject;
import org.colorcoding.tools.btulz.model.IBusinessObjectItem;
import org.colorcoding.tools.btulz.model.IDomain;
import org.colorcoding.tools.btulz.model.IModel;
import org.colorcoding.tools.btulz.model.IProperty;
import org.colorcoding.tools.btulz.model.data.emBORelation;
import org.colorcoding.tools.btulz.model.data.emDataSubType;
import org.colorcoding.tools.btulz.model.data.emDataType;
import org.colorcoding.tools.btulz.model.data.emModelType;
import org.colorcoding.tools.btulz.transformer.TransformException;

import com.sap.smb.sbo.api.IDocument_Lines;
import com.sap.smb.sbo.api.IDocuments;
import com.sap.smb.sbo.api.IUserFields;
import com.sap.smb.sbo.api.Items;

public class CodeTransformer extends org.colorcoding.tools.btulz.transformer.CodeTransformer {

	public final static String DATA_SPLIT_CHAR = ";";
	public final static String B1_OBJECT_CODE_TEMPLATE = "o%s";
	public final static String B1_DOCUMENT_PREFIX = "Document_";

	private String domainName;

	public String getDomainName() {
		if (this.domainName == null || this.domainName.isEmpty()) {
			this.domainName = "DataInteraction";
		}
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	private String collectionTemplate;

	public String getCollectionTemplate() {
		if (this.collectionTemplate == null || this.collectionTemplate.isEmpty()) {
			this.collectionTemplate = "%s[]";
		}
		return collectionTemplate;
	}

	public void setCollectionTemplate(String collectionTemplate) {
		this.collectionTemplate = collectionTemplate;
	}

	public void addDomain(String types) throws TransformException {
		try {
			if (types == null || types.isEmpty()) {
				return;
			}
			IDomain domain = new Domain();
			domain.setName(this.getDomainName());
			String namespace = Items.class.getName();
			namespace = namespace.substring(0, namespace.lastIndexOf("."));
			String[] tmps = types.split(DATA_SPLIT_CHAR);
			for (String item : tmps) {
				if (item == null || item.trim().isEmpty()) {
					continue;
				}
				if (item.startsWith(B1_DOCUMENT_PREFIX)) {
					ModuleWriter moduleWriter = new ModuleWriter();
					moduleWriter.domain = domain;
					moduleWriter.element = new B1AnalyzerGetter().analyse(IDocuments.class);
					moduleWriter.write(item.substring(item.indexOf("_") + 1));
				} else {
					Class<?> clazz = Class.forName(String.format("%s.I%s", namespace, item));
					ModuleWriter moduleWriter = new ModuleWriter();
					moduleWriter.domain = domain;
					moduleWriter.element = new B1AnalyzerGetter().analyse(clazz);
					moduleWriter.write();
				}
			}
			this.addDomain(domain);
		} catch (Exception e) {
			throw new TransformException(e);
		}
	}

	private class ModuleWriter {

		public ModuleWriter() {
			this.knownTypes = new ArrayList<>();
			this.knownTypes.add(Integer.class);
			this.knownTypes.add(Short.class);
			this.knownTypes.add(Long.class);
			this.knownTypes.add(Float.class);
			this.knownTypes.add(Double.class);
			this.knownTypes.add(Boolean.class);
			this.knownTypes.add(BigDecimal.class);
			this.knownTypes.add(BigInteger.class);
			this.knownTypes.add(String.class);
			this.knownTypes.add(Character.class);
			this.knownTypes.add(Date.class);
		}

		private List<Class<?>> knownTypes;
		public IDomain domain;
		public ElementRoot element;

		public void write() {
			this.write(null);
		}

		public void write(String modelName) {
			IModel model = this.domain.getModels().create();
			model.setName(this.element.getName());
			if (modelName != null && !modelName.isEmpty()) {
				model.setName(modelName);
			}
			model.setModelType(emModelType.Unspecified);
			if (this.element.getType() == IDocuments.class) {
				model.setModelType(emModelType.Document);
			}
			IBusinessObject businessObject = this.domain.getBusinessObjects().create();
			businessObject.setMappedModel(model);
			businessObject.setShortName(String.format(B1_OBJECT_CODE_TEMPLATE, model.getName()));
			if (modelName != null && !modelName.isEmpty()) {
				businessObject.setShortName(B1_DOCUMENT_PREFIX + businessObject.getShortName());
			}
			if (modelName != null && !modelName.isEmpty()) {

			}
			for (Element item : this.element.getChilds()) {
				this.write(item, model, businessObject);
			}
		}

		private void write(Element element, IModel model, IBusinessObject businessObject) {
			if (element.getType() == String.class || element.getType() == Character.class) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Alphanumeric);
				property.setDataSubType(emDataSubType.Default);
			} else if (element.getType() == Date.class) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Date);
				property.setDataSubType(emDataSubType.Date);
			} else if (element.getType() == Boolean.class) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Boolean);
				property.setDataSubType(emDataSubType.Default);
			} else if (element.getType() == Integer.class || element.getType() == Short.class
					|| element.getType() == Long.class || element.getType() == BigInteger.class) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Numeric);
				property.setDataSubType(emDataSubType.Default);
			} else if (element.getType() == Float.class || element.getType() == Double.class
					|| element.getType() == BigDecimal.class) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Decimal);
				property.setDataSubType(emDataSubType.Default);
			} else if (element.getType() == IUserFields.class) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Unknown);
				property.setDataSubType(emDataSubType.Default);
				property.setDeclaredType("UserFields");
			} else if (element.isCollection()) {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Unknown);
				property.setDataSubType(emDataSubType.Default);
				IBusinessObjectItem businessObjectItem = null;
				IModel newModel = this.domain.getModels().firstOrDefault(c -> c.getName().equals(element.getName()));
				if (newModel == null) {
					newModel = this.domain.getModels().create();
					newModel.setName(element.getName());
					newModel.setModelType(emModelType.Unspecified);
					if (element.getType() == IDocument_Lines.class) {
						model.setModelType(emModelType.DocumentLine);
					}
					businessObjectItem = businessObject.getRelatedBOs().create();
					for (Element item : element.getChilds()) {
						this.write(item, newModel, businessObjectItem);
					}
				} else {
					businessObjectItem = businessObject.getRelatedBOs().create();
				}
				businessObjectItem.setMappedModel(newModel);
				businessObjectItem.setRelation(emBORelation.OneToMany);
				property.setDeclaredType(
						String.format(CodeTransformer.this.getCollectionTemplate(), newModel.getName()));
			} else {
				IProperty property = model.getProperties().create();
				property.setName(element.getName());
				property.setDataType(emDataType.Unknown);
				property.setDataSubType(emDataSubType.Default);
				IBusinessObjectItem businessObjectItem = null;
				IModel newModel = this.domain.getModels().firstOrDefault(c -> c.getName().equals(element.getName()));
				if (newModel == null) {
					newModel = this.domain.getModels().create();
					newModel.setName(element.getName());
					newModel.setModelType(emModelType.Unspecified);
					businessObjectItem = businessObject.getRelatedBOs().create();
					for (Element item : element.getChilds()) {
						this.write(item, newModel, businessObjectItem);
					}
				} else {
					businessObjectItem = businessObject.getRelatedBOs().create();
				}
				businessObjectItem.setMappedModel(newModel);
				businessObjectItem.setRelation(emBORelation.OneToOne);
				property.setDeclaredType(newModel.getName());
			}
		}
	}
}
