package org.colorcoding.ibas.bobas.businessone.demo.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.businessone.BORepositoryDemo;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;

@Path("")
public class DataService extends BORepositoryDemo {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchItem")
	public OperationResult<DataWrapping> fetchItem(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchItem(criteria, token);
	}

}
