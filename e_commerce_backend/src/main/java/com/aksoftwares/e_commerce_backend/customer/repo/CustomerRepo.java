package com.aksoftwares.e_commerce_backend.customer.repo;

import com.aksoftwares.e_commerce_backend.customer.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends MongoRepository<Customer, String> {

    @Query("{'email' : ?0}")
    Customer findByEmail(String email);

    @Query("{ 'phone': ?0 }")
    Customer findByPhone(String phone);
}
