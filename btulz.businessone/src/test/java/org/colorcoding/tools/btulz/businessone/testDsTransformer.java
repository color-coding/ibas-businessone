package org.colorcoding.tools.btulz.businessone;

import java.io.File;

import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.transformer.DsTransformer;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMUtil;

import junit.framework.TestCase;

public class testDsTransformer extends TestCase {

	public void testB1() {
		int error = SBOCOMConstants.BoDataServerTypes_dst_MSSQL2016;
		ICompany company = SBOCOMUtil.newCompany();
		company.setServer("ibas-demo-b1");
		company.setCompanyDB("SBODemoCN");
		company.setUserName("manager");
		company.setPassword("manager");
		company.setDbUserName("sa");
		company.setDbPassword("avatech");
		error = company.connect();
		if (error != 0) {
			System.err.println(String.format("Company is not connected![%s]-[%s]", company.getLastErrorCode(),
					company.getLastErrorDescription()));
		} else {
			System.out.println(String.format("Company [%s] is connected!", company.getCompanyDB()));
		}
	}

	public void testDs() throws Exception {
		DsTransformer dsTransformer = new DsTransformer();
		dsTransformer
				.addDomains(Environment.getWorkingFolder() + "/ds_tt_userobjects.xml".replace("/", File.separator));
		dsTransformer.setServer("ibas-demo-b1");
		dsTransformer.setCompanyDB("SBODemoCN");
		dsTransformer.setUserName("manager");
		dsTransformer.setPassword("manager");
		dsTransformer.setDbUserName("sa");
		dsTransformer.setDbPassword("avatech");
		dsTransformer.transform();
	}
}
