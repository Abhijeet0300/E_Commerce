package com.aksoftwares.e_commerce_backend.seller.listener;

import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.aksoftwares.e_commerce_backend.seller.model.Seller;

@Component
public class SellerModelListener extends AbstractMongoEventListener<Seller> {
    @Override
    public void onBeforeConvert(BeforeConvertEvent<Seller> event) {
        super.onBeforeConvert(event);
        Seller seller = event.getSource();

        if(seller.getId() == null || seller.getId().trim().isEmpty()) {
            String customId = "SELL-" + UUID.randomUUID().toString();
            seller.setId(customId);
        }
    }
}
