package org.colorcoding.ibas.bobas.businessone.demo.rest;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.businessone.BORepositoryDemo;
import org.colorcoding.ibas.bobas.businessone.data.DataWrapping;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;

@Path("")
public class DataService extends BORepositoryDemo {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchItems")
	public OperationResult<DataWrapping> fetchItems(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchItems(criteria, token);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBusinessPartners")
	public OperationResult<DataWrapping> fetchBusinessPartners(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchBusinessPartners(criteria, token);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchOrders")
	public OperationResult<DataWrapping> fetchOrders(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchOrders(criteria, token);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchPurchaseOrders")
	public OperationResult<DataWrapping> fetchPurchaseOrders(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchPurchaseOrders(criteria, token);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchProductionOrders")
	public OperationResult<DataWrapping> fetchProductionOrders(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchProductionOrders(criteria, token);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchItemRecords")
	public OperationResult<DataWrapping> fetchItemRecords(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchItemRecords(criteria, token);
	}
}
