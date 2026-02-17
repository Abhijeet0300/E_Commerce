package com.aksoftwares.e_commerce_backend.customer;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Customer {
    @Id
    @GeneratedValue(generator = "customer-id-generator")
    @GenericGenerator(
        name = "customer-id-generator",
        strategy = "com.aksoftwares.e_commerce_backend.prefixes.CustomerIdGenerator"
    )
    private String id;

    @Column(unique= true, nullable = false)
    private String email;

    private String name;
    private String phoneNumber;
    private String password;

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}
