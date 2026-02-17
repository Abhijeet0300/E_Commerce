package com.aksoftwares.e_commerce_backend.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Transactional
    public Customer registerCustomer(Customer customer) {
        if (customerRepo.existsByEmail(customer.getEmail())) {
            return null;
        }
        return customerRepo.save(customer);
    }

    public Customer customerLogin(String email, String password) {
        Customer customer = customerRepo.findByEmail(email);
        if (customer == null) {
            return null;
        }
        if (!customer.getPassword().equals(password)) {
            return null;
        }
        return customer;
    }
}
