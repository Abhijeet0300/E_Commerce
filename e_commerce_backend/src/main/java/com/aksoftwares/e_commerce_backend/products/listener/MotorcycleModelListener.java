package com.aksoftwares.e_commerce_backend.products.listener;

import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.aksoftwares.e_commerce_backend.products.model.Motorcycle;

@Component
public class MotorcycleModelListener extends AbstractMongoEventListener<Motorcycle> {
    @Override
    public void onBeforeConvert(BeforeConvertEvent<Motorcycle> event) {
        super.onBeforeConvert(event);
        Motorcycle bike = event.getSource();

        if(bike.getId() == null || bike.getId().trim().isEmpty()) {
            String bikeId = "MOTOR-" + UUID.randomUUID().toString();
            bike.setId(bikeId);
        }
    }
}
