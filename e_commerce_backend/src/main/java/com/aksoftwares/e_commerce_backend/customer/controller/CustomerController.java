package com.aksoftwares.e_commerce_backend.customer.controller;

import com.aksoftwares.e_commerce_backend.customer.CustomerConstants;
import com.aksoftwares.e_commerce_backend.customer.model.Customer;
import com.aksoftwares.e_commerce_backend.customer.model.RegisteredCustomerResponse;
import com.aksoftwares.e_commerce_backend.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<RegisteredCustomerResponse> registerCustomer(@RequestBody Customer customer) {
        System.out.println(customer.getEmail());
        RegisteredCustomerResponse registeredCustomerResponse = new RegisteredCustomerResponse();

        if (
                !StringUtils.hasText(customer.getName()) ||
                !StringUtils.hasText(customer.getEmail()) ||
                !StringUtils.hasText(customer.getPhone()) ||
                !StringUtils.hasText(customer.getAddress()) ||
                !StringUtils.hasText(customer.getCountry()) ||
                !StringUtils.hasText(customer.getPassword())
        ) {

            registeredCustomerResponse.setRegistered(false);
            registeredCustomerResponse.setMessage("All fields are required and cannot be empty.");
            return ResponseEntity.badRequest().body(registeredCustomerResponse);
        }

        if(customerService.checkCustomerExists(customer)) {
            registeredCustomerResponse.setRegistered(false);
            registeredCustomerResponse.setMessage(CustomerConstants.CUSTOMER_ALREADY_EXISTS.getValue());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(registeredCustomerResponse);
        }


        Customer savedCustomer = customerService.registerCustomer(customer);

        if (savedCustomer == null) {
            registeredCustomerResponse.setRegistered(false);
            registeredCustomerResponse.setMessage(CustomerConstants.CUSTOMER_REGISTRATION_FAILED.getValue());
            return ResponseEntity.badRequest().body(registeredCustomerResponse);
        } else {
            registeredCustomerResponse.setRegistered(true);
            registeredCustomerResponse.setMessage(CustomerConstants.SUCCESSFULLY_CREATED_CUSTOMER.getValue());
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredCustomerResponse);
        }
    }
}
