package com.aksoftwares.e_commerce_backend.customer;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface CustomerRepo extends JpaRepository<Customer, String>{

    @Query("select c from Customer c where c.email = :email")
    Customer findByEmail(String email);

    @Query("select count(c) > 0 from Customer c where c.email = :email")
    boolean existsByEmail(@Param("email") String email);
}
