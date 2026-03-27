package com.aksoftwares.e_commerce_backend.products.constants;

public enum MotorcycleConstants {

    IN_STOCK("In Stock"),
    OUT_OF_STOCK("Out of stock"),

    MOTORCYCLES_FOUND("Motorcycles found"),
    MOTORCYCLES_NOT_FOUND("No motorcycles found"),
    UNABLE_TO_FETCH("Unable to fetch data");

    private final String value;

    MotorcycleConstants(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
