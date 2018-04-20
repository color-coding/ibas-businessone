package org.colorcoding.ibas.bobas.businessone;

import java.io.File;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.repository.BORepositoryBusinessOne;
import org.colorcoding.ibas.bobas.businessone.serialization.B1Serializer;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.db.ParsingException;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IItems;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

import junit.framework.TestCase;

class BORepositoryTest extends BORepositoryBusinessOne {

	public ICompany getB1Company() {
		return super.getB1Company();
	}

	public OperationResult<DataWrapping> fetchItem(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IItems item : this.fetchItem(criteria)) {
				operationResult.addResultObjects(B1Serializer.wrap(item.getAsXML()));
				item.release();
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		} finally {
			System.gc();
		}
	}

	public List<IItems> fetchItem(ICriteria criteria) throws SBOCOMException, ParsingException {
		IRecordset recordset = null;
		try {
			List<IItems> items = new ArrayList<>();
			recordset = this.query(this.getB1Adapter().parseSqlQuery(criteria, "OITM"));
			while (!recordset.isEoF()) {
				IItems item = SBOCOMUtil.getItems(this.getB1Company(),
						String.valueOf(recordset.getFields().item("ItemCode").getValue()));
				items.add(item);
				recordset.moveNext();
			}
			return items;
		} finally {
			if (recordset != null) {
				recordset.release();
			}
		}
	}

}

public class testBORepositoryBusinessOne extends TestCase {

	public String getToken() {
		return "";
	}

	public void testB1Data() throws SBOCOMException {
		BORepositoryTest boRepository = new BORepositoryTest();
		ICompany b1Company = boRepository.getB1Company();
		IRecordset recordset = SBOCOMUtil.newRecordset(b1Company);
		recordset.doQuery("Select * from OITM");
		recordset.saveXML(MyConfiguration.getWorkFolder() + File.separator + "recordset_data.xml");
		System.out.println("schema: recordset");
		System.out.println(b1Company.getBusinessObjectXmlSchema(SBOCOMConstants.BoObjectTypes_BoRecordset));
		IItems item = SBOCOMUtil.getItems(b1Company, String.valueOf(recordset.getFields().item("ItemCode").getValue()));
		item.saveXML(MyConfiguration.getWorkFolder() + File.separator + "item_data.xml");
		System.out.println("schema: items");
		System.out.println(b1Company.getBusinessObjectXmlSchema(SBOCOMConstants.BoObjectTypes_oItems));
		System.out.println("schema: production orders");
		System.out.println(b1Company.getBusinessObjectXmlSchema(SBOCOMConstants.BoObjectTypes_oProductionOrders));
	}

	public void testFetch() {
		ICriteria criteria = new Criteria();
		BORepositoryTest boRepository = new BORepositoryTest();
		IOperationResult<DataWrapping> operationResult = boRepository.fetchItem(criteria, this.getToken());
		assertEquals(operationResult.getMessage(), 0, operationResult.getResultCode());
		for (DataWrapping wrapping : operationResult.getResultObjects()) {
			System.out.println(wrapping.getContent());
		}
	}
}
