package com.aksoftwares.e_commerce_backend.seller.listener;

import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

import java.util.UUID;

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
