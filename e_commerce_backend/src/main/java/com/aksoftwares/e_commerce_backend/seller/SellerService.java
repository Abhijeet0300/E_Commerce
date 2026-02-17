package com.aksoftwares.e_commerce_backend.seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class SellerService {
    @Autowired
    private SellerRepo sellerRepo;

    public Seller registerSeller(Seller seller) {
        if(sellerRepo.existsByEmail(seller.getEmail())) {
            return null;
        }
        return sellerRepo.save(seller);
    }
}
