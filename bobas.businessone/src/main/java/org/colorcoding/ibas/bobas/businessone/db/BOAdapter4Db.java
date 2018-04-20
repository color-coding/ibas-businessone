package org.colorcoding.ibas.bobas.businessone.db;

import org.colorcoding.ibas.bobas.db.ISqlScripts;

interface SqlScriptsGetter {
	ISqlScripts getSqlScripts();
}

class BOAdapter4MsSql extends org.colorcoding.ibas.bobas.db.mssql.BOAdapter implements SqlScriptsGetter {
	public ISqlScripts getSqlScripts() {
		return super.getSqlScripts();
	}
}

class BOAdapter4Hana extends org.colorcoding.ibas.bobas.db.hana.BOAdapter implements SqlScriptsGetter {
	public ISqlScripts getSqlScripts() {
		return super.getSqlScripts();
	}
}
