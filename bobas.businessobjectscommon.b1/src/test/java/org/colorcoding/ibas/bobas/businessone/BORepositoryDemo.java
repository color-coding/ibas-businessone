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
import com.sap.smb.sbo.api.IJournalEntries;
import com.sap.smb.sbo.api.IProductionOrders;
import com.sap.smb.sbo.api.IRecordset;
import com.sap.smb.sbo.api.SBOCOMConstants;
import com.sap.smb.sbo.api.SBOCOMException;
import com.sap.smb.sbo.api.SBOCOMUtil;

public class BORepositoryDemo extends BORepositoryBusinessOne {

	public ICompany getCompany() throws RepositoryException {
		return super.getB1Company();
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-Items
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param criteria 查询
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param criteria 查询
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param criteria 查询
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param criteria 查询
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param criteria 查询
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

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-Items记录
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchItemRecords(ICriteria criteria, String token) {
		IRecordset recordset = null;
		boolean open = false;
		try {
			this.setUserToken(token);
			open = this.openRepository();
			// 形成查询
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("SELECT");
			stringBuilder.append(" ");
			if (criteria.getResultCount() > 0) {
				stringBuilder.append("TOP");
				stringBuilder.append(" ");
				stringBuilder.append(criteria.getResultCount());
				stringBuilder.append(" ");
			}
			stringBuilder.append("ItemCode, ");
			stringBuilder.append("ItemName");
			stringBuilder.append(" ");
			stringBuilder.append("FROM");
			stringBuilder.append(" ");
			stringBuilder.append("OITM");
			stringBuilder.append(" ");
			if (criteria.getConditions().size() > 0) {
				// 解析查询条件
				stringBuilder.append("WHERE");
				stringBuilder.append(" ");
				stringBuilder.append(this.getB1Adapter().parseSqlQuery(criteria.getConditions()));
			}
			// 通过di运行sql
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			recordset = super.query(stringBuilder.toString());
			while (!recordset.isEoF()) {
				operationResult.addResultObjects(this.getB1Serializer().wrap(recordset));
				recordset.moveNext();
			}
			return operationResult;
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		} finally {
			if (recordset != null) {
				recordset.release();
			}
			if (open) {
				try {
					this.closeRepository();
				} catch (RepositoryException e) {
					Logger.log(e);
				}
			}
			System.gc();
		}
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-JournalEntries
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果（已被封装）
	 */
	public OperationResult<DataWrapping> fetchJournalEntries(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			OperationResult<DataWrapping> operationResult = new OperationResult<>();
			for (IJournalEntries item : this.fetchJournalEntries(criteria)) {
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
	 * 查询-JournalEntries
	 * 
	 * @param criteria 查询
	 * @return 查询结果
	 */
	public List<IJournalEntries> fetchJournalEntries(ICriteria criteria)
			throws SBOCOMException, ParsingException, RepositoryException {
		IRecordset recordset = null;
		boolean open = false;
		try {
			open = this.openRepository();
			List<IJournalEntries> datas = new ArrayList<>();
			recordset = this
					.query(this.getB1Adapter().parseSqlQuery(criteria, SBOCOMConstants.BoObjectTypes_oJournalEntries));
			while (!recordset.isEoF()) {
				IJournalEntries data = SBOCOMUtil.getJournalEntries(this.getB1Company(),
						(Integer) recordset.getFields().item("TransId").getValue());
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
