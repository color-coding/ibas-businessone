package org.colorcoding.ibas.bobas.businessone.db;

import com.sap.smb.sbo.api.ICompany;
import com.sap.smb.sbo.api.SBOCOMConstants;

public class B1AdapterFactory {

	public static IB1Adapter create(ICompany company) {
		if (company.getDbServerType() == SBOCOMConstants.BoDataServerTypes_dst_HANADB) {
			return new B1Adapter(company, new BOAdapter4MsSql());
		}
		return new B1Adapter(company, new BOAdapter4Hana());
	}
}
