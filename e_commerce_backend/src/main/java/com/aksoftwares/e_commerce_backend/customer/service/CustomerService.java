package com.aksoftwares.e_commerce_backend.customer.service;

import com.aksoftwares.e_commerce_backend.customer.model.Customer;
import com.aksoftwares.e_commerce_backend.customer.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomerService {
    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean checkCustomerExists(Customer customer) {
        return customerRepo.findByEmail(customer.getEmail().trim()) != null;
    }

    public Customer registerCustomer(Customer customer) {
        String rawPassword = customer.getPassword();
        String hashedPassword = passwordEncoder.encode(rawPassword);
        customer.setPassword(hashedPassword);

        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime updatedAt = LocalDateTime.now();

        customer.setCreatedAt(createdAt);
        customer.setUpdatedAt(updatedAt);

        return customerRepo.save(customer);
    }
}
