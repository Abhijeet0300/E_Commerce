package com.aksoftwares.e_commerce_backend.seller;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepo extends JpaRepository<Seller, String> {
    
    @Query("select case when count(s) > 0 then true else false end from Seller s where s.email = ?1")
    boolean existsByEmail(String email);

    
}
