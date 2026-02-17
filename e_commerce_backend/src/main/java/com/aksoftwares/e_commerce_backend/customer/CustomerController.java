package com.aksoftwares.e_commerce_backend.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aksoftwares.e_commerce_backend.auth.dto.LoginRequest;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        Customer registeredUser = service.registerCustomer(customer);
        System.out.println(registeredUser);
        if (registeredUser == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account already exists.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Account created successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> cutomerLogin(@RequestBody LoginRequest loginRequest) {
        Customer customer = service.customerLogin(loginRequest.getEmail(), loginRequest.getPassword());
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Login successful.");
    }
}
