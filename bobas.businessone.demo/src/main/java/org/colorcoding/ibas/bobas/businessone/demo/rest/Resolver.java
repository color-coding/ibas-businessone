package org.colorcoding.ibas.bobas.businessone.demo.rest;

import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.ext.Provider;

import org.colorcoding.ibas.bobas.jersey.MoxyJsonContextResolver;

@Provider
@Produces(MediaType.APPLICATION_JSON)
public class Resolver extends MoxyJsonContextResolver {
}
