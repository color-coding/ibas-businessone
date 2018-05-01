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

import com.sap.smb.sbo.api.IBusinessPartners;
import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.IDocuments;
import com.sap.smb.sbo.api.IItems;
import com.sap.smb.sbo.api.IProductionOrders;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class BORepositoryDemo extends BORepositoryBusinessOne {

	public ICompany getCompany() {
		return super.getB1Company();
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-Items
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchItems(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IItems item : this.fetchItems(criteria)) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(item));
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

	/**
	 * 查询-Items
	 * 
	 * @param criteria
	 *            查询
	 * @return 查询结果
	 */
	public List<IItems> fetchItems(ICriteria criteria) throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IItems> datas = new ArrayList<>();
			recordset = this.query(this.getB1Adapter().parseSqlQuery(criteria, SBOCOMConstants.BoObjectTypes_oItems));
			while (!recordset.isEoF()) {
				IItems data = SBOCOMUtil.getItems(this.getB1Company(),
						String.valueOf(recordset.getFields().item(0).getValue()));
				datas.add(data);
				recordset.moveNext();
			}
			return datas;
		} finally {
			if (recordset != null) {
				recordset.release();
			}
			if (open) {
				this.closeRepository();
			}
		}
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-BusinessPartners
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchBusinessPartners(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IBusinessPartners item : this.fetchBusinessPartners(criteria)) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(item));
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

	/**
	 * 查询-BusinessPartners
	 * 
	 * @param criteria
	 *            查询
	 * @return 查询结果
	 */
	public List<IBusinessPartners> fetchBusinessPartners(ICriteria criteria)
			throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IBusinessPartners> datas = new ArrayList<>();
			recordset = this.query(
					this.getB1Adapter().parseSqlQuery(criteria, SBOCOMConstants.BoObjectTypes_oBusinessPartners));
			while (!recordset.isEoF()) {
				IBusinessPartners data = SBOCOMUtil.getBusinessPartners(this.getB1Company(),
						String.valueOf(recordset.getFields().item(0).getValue()));
				datas.add(data);
				recordset.moveNext();
			}
			return datas;
		} finally {
			if (recordset != null) {
				recordset.release();
			}
			if (open) {
				this.closeRepository();
			}
		}
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-Orders
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchOrders(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IDocuments item : this.fetchOrders(criteria)) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(item));
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

	/**
	 * 查询-Orders
	 * 
	 * @param criteria
	 *            查询
	 * @return 查询结果
	 */
	public List<IDocuments> fetchOrders(ICriteria criteria)
			throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IDocuments> datas = new ArrayList<>();
			recordset = this
					.query(this.getB1Adapter().parseSqlQuery(criteria, SBOCOMConstants.BoObjectTypes_Document_oOrders));
			while (!recordset.isEoF()) {
				IDocuments data = SBOCOMUtil.getDocuments(this.getB1Company(),
						SBOCOMConstants.BoObjectTypes_Document_oOrders,
						(Integer) recordset.getFields().item("DocEntry").getValue());
				datas.add(data);
				recordset.moveNext();
			}
			return datas;
		} finally {
			if (recordset != null) {
				recordset.release();
			}
			if (open) {
				this.closeRepository();
			}
		}
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-PurchaseOrders
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchPurchaseOrders(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IDocuments item : this.fetchPurchaseOrders(criteria)) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(item));
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

	/**
	 * 查询-PurchaseOrders
	 * 
	 * @param criteria
	 *            查询
	 * @return 查询结果
	 */
	public List<IDocuments> fetchPurchaseOrders(ICriteria criteria)
			throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IDocuments> datas = new ArrayList<>();
			recordset = this.query(this.getB1Adapter().parseSqlQuery(criteria,
					SBOCOMConstants.BoObjectTypes_Document_oPurchaseOrders));
			while (!recordset.isEoF()) {
				IDocuments data = SBOCOMUtil.getDocuments(this.getB1Company(),
						SBOCOMConstants.BoObjectTypes_Document_oPurchaseOrders,
						(Integer) recordset.getFields().item("DocEntry").getValue());
				datas.add(data);
				recordset.moveNext();
			}
			return datas;
		} finally {
			if (recordset != null) {
				recordset.release();
			}
			if (open) {
				this.closeRepository();
			}
		}
	}
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-ProductionOrders
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchProductionOrders(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IProductionOrders item : this.fetchProductionOrders(criteria)) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(item));
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

	/**
	 * 查询-ProductionOrders
	 * 
	 * @param criteria
	 *            查询
	 * @return 查询结果
	 */
	public List<IProductionOrders> fetchProductionOrders(ICriteria criteria)
			throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IProductionOrders> datas = new ArrayList<>();
			recordset = this.query(
					this.getB1Adapter().parseSqlQuery(criteria, SBOCOMConstants.BoObjectTypes_oProductionOrders));
			while (!recordset.isEoF()) {
				IProductionOrders data = SBOCOMUtil.getProductionOrders(this.getB1Company(),
						(Integer) recordset.getFields().item("DocEntry").getValue());
				datas.add(data);
				recordset.moveNext();
			}
			return datas;
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
