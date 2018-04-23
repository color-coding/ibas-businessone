package org.colorcoding.ibas.bobas.businessone;

import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.businessone.repository.BORepositoryBusinessOne;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.db.ParsingException;
import org.colorcoding.ibas.bobas.message.Logger;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IItems;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class BORepositoryDemo extends BORepositoryBusinessOne {

	public ICompany getCompany() {
		return super.getB1Company();
	}

	public OperationResult<DataWrapping> fetchItem(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IItems item : this.fetchItem(criteria)) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(item.getAsXML()));
				item.release();
			}
			return operationResult;
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		} finally {
			System.gc();
		}
	}

	public List<IItems> fetchItem(ICriteria criteria) throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IItems> items = new ArrayList<>();
			recordset = this.query(this.getB1Adapter().parseSqlQuery(criteria, SBOCOMConstants.BoObjectTypes_oItems));
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
			if (open) {
				this.closeRepository();
			}
		}
	}
}
