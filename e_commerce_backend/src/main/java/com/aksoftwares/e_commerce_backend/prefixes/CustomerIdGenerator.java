package com.aksoftwares.e_commerce_backend.prefixes;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;


public class CustomerIdGenerator implements IdentifierGenerator {
    private static final String PREFIX = "Cust-";

    @Override
    public Serializable generate(
        SharedSessionContractImplementor session,
        Object object
    ) {
        String randomId = UUID.randomUUID().toString().substring(0,8).toUpperCase();
        return PREFIX + randomId;
    }
}
