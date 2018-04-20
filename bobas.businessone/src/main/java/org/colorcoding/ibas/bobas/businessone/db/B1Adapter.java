package org.colorcoding.ibas.bobas.businessone.db;

import org.colorcoding.ibas.bobas.common.IConditions;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISorts;
import org.colorcoding.ibas.bobas.common.ISqlQuery;
import org.colorcoding.ibas.bobas.common.SqlQuery;
import org.colorcoding.ibas.bobas.db.IBOAdapter4Db;
import org.colorcoding.ibas.bobas.db.ISqlScripts;
import org.colorcoding.ibas.bobas.db.ParsingException;
import org.colorcoding.ibas.bobas.i18n.I18N;

import com.sap.smb.sbo.api.ICompany;

public class B1Adapter implements IB1Adapter {

	public B1Adapter(ICompany b1Company) {
		this.setB1Company(b1Company);
	}

	public B1Adapter(ICompany b1Company, IBOAdapter4Db adapter) {
		this(b1Company);
		this.setAdapter(adapter);
	}

	private IBOAdapter4Db adapter;

	protected IBOAdapter4Db getAdapter() {
		return adapter;
	}

	private void setAdapter(IBOAdapter4Db adapter) {
		this.adapter = adapter;
	}

	private ICompany b1Company;

	protected ICompany getB1Company() {
		return b1Company;
	}

	private void setB1Company(ICompany b1Company) {
		this.b1Company = b1Company;
	}

	@Override
	public ISqlQuery parseSqlQuery(ICriteria criteria) throws ParsingException {
		return this.getAdapter().parseSqlQuery(criteria);
	}

	@Override
	public ISqlQuery parseSqlQuery(IConditions conditions) throws ParsingException {
		return this.getAdapter().parseSqlQuery(conditions);
	}

	@Override
	public ISqlQuery parseSqlQuery(ISorts sorts) throws ParsingException {
		return this.getAdapter().parseSqlQuery(sorts);
	}

	@Override
	public ISqlQuery parseSqlQuery(ICriteria criteria, Integer boCode) throws ParsingException {
		// 获取主表
		String table = this.getMasterTable(boCode);
		if (table == null || table.isEmpty()) {
			throw new ParsingException(I18N.prop("msg_bobas_not_found_bo_table", boCode));
		}
		return this.parseSqlQuery(criteria, table);
	}

	@Override
	public ISqlQuery parseSqlQuery(ICriteria criteria, String table) throws ParsingException {
		// 拼接语句
		String order = this.getAdapter().parseSqlQuery(criteria.getSorts()).getQueryString();
		String where = this.getAdapter().parseSqlQuery(criteria.getConditions()).getQueryString();
		ISqlScripts sqlScripts = ((SqlScriptsGetter) this.getAdapter()).getSqlScripts();
		return new SqlQuery(sqlScripts.groupSelectQuery("*", table, where, order, criteria.getResultCount()));
	}

	protected String getMasterTable(Integer boCode) {
		return "";
	}
}
