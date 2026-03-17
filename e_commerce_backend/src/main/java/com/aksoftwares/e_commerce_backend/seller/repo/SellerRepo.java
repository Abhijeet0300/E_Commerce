package com.aksoftwares.e_commerce_backend.seller.repo;

import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepo extends MongoRepository<Seller, String> {
    @Query("{'email' : ?0}")
    Seller findByEmail(String email);
}
