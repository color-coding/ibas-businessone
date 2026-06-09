package org.colorcoding.tools.btulz.businessone;

import java.io.File;
import java.util.ArrayList;

import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.command.Command4Ds;
import org.colorcoding.tools.btulz.businessone.transformer.DsTransformer;

import com.sap.smb.sbo.api.SBOCOMConstants;

import junit.framework.TestCase;

/**
 * 测试数据结构部署功能（需要B1服务环境）
 */
public class TestDsTransformer extends TestCase {

	/**
	 * 测试DsTransformer转换部署
	 */
	public void testDs() throws Exception {
		DsTransformer dsTransformer = new DsTransformer();
		dsTransformer
				.addDomains(Environment.getWorkingFolder() + "/ds_tt_userobjects.xml".replace("/", File.separator));
		dsTransformer.setServer("ibas-demo-b1");
		dsTransformer.setCompanyDB("SBODemoCN");
		dsTransformer.setUserName("manager");
		dsTransformer.setPassword("manager");
		dsTransformer.setDbServerType(SBOCOMConstants.BoDataServerTypes_dst_MSSQL2014);
		dsTransformer.setDbUserName("sa");
		dsTransformer.setDbPassword("1q2w3e");
		dsTransformer.transform();
	}

	/**
	 * 测试ds命令行
	 */
	public void testCmd() {
		ArrayList<String> args = new ArrayList<>();
		args.add(String.format(Command4Ds.COMMAND_PROMPT));
		args.add(String.format("-Server=%s", "ibas-demo-b1"));
		args.add(String.format("-CompanyDB=%s", "SBODemoCN"));
		args.add(String.format("-UserName=%s", "manager"));
		args.add(String.format("-Password=%s", "manager"));
		args.add(String.format("-DbServerType=%s", "8"));
		args.add(String.format("-DbUser=%s", "sa"));
		args.add(String.format("-DbPassword=%s", "1q2w3e"));
		args.add(String.format("-LicenseServer=%s", ""));
		args.add(String.format("-SLDServer=%s", ""));
		args.add(String.format("-Language=%s", "15"));
		Console.main(args.toArray(new String[] {}));
	}
}
