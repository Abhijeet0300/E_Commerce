package com.aksoftwares.e_commerce_backend.products.listener;

import com.aksoftwares.e_commerce_backend.products.model.Bike;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

import java.util.UUID;

public class BikeModelListener extends AbstractMongoEventListener<Bike> {
    @Override
    public void onBeforeConvert(BeforeConvertEvent<Bike> event) {
        super.onBeforeConvert(event);
        Bike bike = event.getSource();

        if(bike.getId() == null || bike.getId().trim().isEmpty()) {
            String bikeId = "PROD-" + UUID.randomUUID().toString();
            bike.setId(bikeId);
        }
    }
}
