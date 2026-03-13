package com.aksoftwares.e_commerce_backend.customer.listener;

import com.aksoftwares.e_commerce_backend.customer.model.Customer;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CustomerModelListener extends AbstractMongoEventListener<Customer> {
    @Override
    public void onBeforeConvert(BeforeConvertEvent<Customer> event) {
        super.onBeforeConvert(event);
        Customer customer = event.getSource();

        if(customer.getCustomerId() == null || customer.getCustomerId().trim().isEmpty()) {
            String customId = "CUST-" +  UUID.randomUUID().toString();
            customer.setCustomerId(customId);
        }
    }
}
