package com.aksoftwares.e_commerce_backend.products.model;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("motorcycle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Motorcycle {

    @Id
    private String id;

    @NotBlank(message = "Bike name cannot be empty")
    private String motorcycleName;

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

    @NotBlank(message = "Seller ID is required")
    private String sellerId;

    private int stockQuantity;
    private List<String> imageUrls;
    private String status = "In Stock";
}
