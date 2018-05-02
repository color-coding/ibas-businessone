package org.colorcoding.ibas.bobas.businessone.db;

import org.colorcoding.ibas.bobas.common.IConditions;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISorts;
import org.colorcoding.ibas.bobas.common.ISqlQuery;
import org.colorcoding.ibas.bobas.db.ParsingException;

public interface IB1Adapter {

	ISqlQuery parseSqlQuery(ICriteria criteria) throws ParsingException;

	ISqlQuery parseSqlQuery(IConditions conditions) throws ParsingException;

	ISqlQuery parseSqlQuery(ISorts sorts) throws ParsingException;

	ISqlQuery parseSqlQuery(ICriteria criteria, Integer boCode) throws ParsingException;

	ISqlQuery parseSqlQuery(ICriteria criteria, String table) throws ParsingException;
}
