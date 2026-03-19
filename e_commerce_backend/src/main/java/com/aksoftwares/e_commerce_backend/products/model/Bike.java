package com.aksoftwares.e_commerce_backend.products.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

@Document("bike")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bike {

    @Id
    private String id;

    @NotBlank(message = "Bike name cannot be empty")
    private String bikeName;

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    private String model;

    @Positive(message = "Engine capacity (CC) must be greater than zero")
    private double cc;

    @Positive(message = "BHP must be greater than zero")
    private double bhp;

    @Positive(message = "Torque must be greater than zero")
    private double torque;

    @Positive(message = "Price must be greater than zero")
    private BigDecimal price;

    private String desc;

    @NotBlank(message = "Store name is required")
    private String storeName;

    @NotBlank(message = "Seller name is required")
    private String sellerName;

    @NotBlank(message = "Seller ID is required")
    private String sellerId;
}
