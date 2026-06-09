package org.colorcoding.tools.btulz.businessone;

import java.io.File;
import java.util.UUID;

import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.transformer.CodeTransformer;
import org.colorcoding.tools.btulz.template.Parameter;

import junit.framework.TestCase;

/**
 * 测试代码生成功能
 */
public class TestCodeTransformer extends TestCase {

	/**
	 * 测试CodeTransformer从B1 DI API接口生成代码
	 */
	public void testTransform() throws Exception {
		CodeTransformer codeTransformer = new CodeTransformer();
		codeTransformer.setTemplateFolder(Environment.getWorkingFolder()
				+ "/../../src/main/resources/code/ibas_b1_service".replace("/", File.separator));
		codeTransformer.setOutputFolder(Environment.getWorkingFolder() + File.separator + "out");
		codeTransformer.setGroupId("org.colorcoding");
		codeTransformer.setArtifactId("b1");
		codeTransformer.setProjectVersion("0.0.1");
		codeTransformer.setProjectUrl("http://colorcoding.org");
		codeTransformer.setDomainName("DataInteraction");
		codeTransformer.addParameters(new Parameter("b1Version", "0.1.0"));
		codeTransformer.addParameters(new Parameter("ibasVersion", "0.1.2"));
		codeTransformer.addParameters(new Parameter("ProjectId", UUID.randomUUID().toString()));
		codeTransformer.addDomain("UserFields;Documents;");
		codeTransformer.transform();
		codeTransformer.getDomains().clear();
		codeTransformer.addDomain("Items;BusinessPartners;Document_Orders;Document_PurchaseOrders;ReportLayout;");
		codeTransformer.transform();
	}
}
