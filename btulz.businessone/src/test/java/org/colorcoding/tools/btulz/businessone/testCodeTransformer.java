package org.colorcoding.tools.btulz.businessone;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.colorcoding.ibas.bobas.data.KeyValue;
import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.transformer.CodeTransformer;
import org.colorcoding.tools.btulz.template.Parameter;

import com.sap.smb.sbo.api.SBOCOMConstants;

import junit.framework.TestCase;

public class testCodeTransformer extends TestCase {

	public void testTransform() throws Exception {
		CodeTransformer codeTransformer = new CodeTransformer();
		codeTransformer.setTemplateFolder("ibas_b1_service");
		codeTransformer.setOutputFolder(Environment.getWorkingFolder() + File.separator + "out");
		codeTransformer.setGroupId("org.colorcoding");
		codeTransformer.setArtifactId("b1");
		codeTransformer.setProjectId(UUID.randomUUID().toString());
		codeTransformer.setProjectVersion("0.0.1");
		codeTransformer.setProjectUrl("http://colorcoding.org");
		codeTransformer.setDomainName("DataInteraction");
		codeTransformer.addParameters(new Parameter("b1Version", "0.1.0"));
		codeTransformer.addParameters(new Parameter("ibasVersion", "0.1.2"));
		codeTransformer.addParameters(new Parameter("ProjectId", UUID.randomUUID().toString()));
		codeTransformer.addDomain("Items;BusinessPartners;Document_Orders;Document_PurchaseOrders;");
		codeTransformer.transform();
	}

	public void testEumns() throws IllegalArgumentException, IllegalAccessException {
		Map<String, List<KeyValue>> values = new HashMap<>();
		for (Field field : SBOCOMConstants.class.getFields()) {
			int modifiers = field.getModifiers();
			if (!Modifier.isStatic(modifiers)) {
				continue;
			}
			if (!Modifier.isPublic(modifiers)) {
				continue;
			}
			if (field.getName().indexOf("_") < 0) {
				continue;
			}
			String group = field.getName().split("_")[0];
			List<KeyValue> keyTexts = values.get(group);
			if (keyTexts == null) {
				keyTexts = new ArrayList<>();
				values.put(group, keyTexts);
			}
			String name = field.getName().substring(group.length() + 1);
			Object value = field.get(SBOCOMConstants.class);
			keyTexts.add(new KeyValue(name, value));
		}
		for (String key : values.keySet()) {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(String.format("export enum %s {", key));
			stringBuilder.append("\n");
			for (KeyValue keyValue : values.get(key)) {
				stringBuilder.append(keyValue.getKey());
				stringBuilder.append(" = ");
				stringBuilder.append(keyValue.getValue());
				stringBuilder.append(",");
				stringBuilder.append("\n");
			}
			stringBuilder.append("}");
			stringBuilder.append("\n");
			System.out.println(stringBuilder.toString());
		}
	}
}
