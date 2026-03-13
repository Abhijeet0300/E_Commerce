package com.aksoftwares.e_commerce_backend.customer;

public enum CustomerConstants {
    SUCCESSFULLY_CREATED_CUSTOMER ("Registered successfully."),
    CUSTOMER_NOT_FOUND ("Customer not found."),
    CUSTOMER_ALREADY_EXISTS ("Customer already exists."),
    CUSTOMER_REGISTRATION_FAILED ("Registration failed, please check your details");

    private String value;
    CustomerConstants(String value) {
        this.value = value;
    }

    // Getter: Allows other classes to read the message
    public String getValue() {
        return value;
    }
}
