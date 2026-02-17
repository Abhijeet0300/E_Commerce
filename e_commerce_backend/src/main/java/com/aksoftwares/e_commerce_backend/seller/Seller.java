package com.aksoftwares.e_commerce_backend.seller;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Seller {
    @Id
    @GeneratedValue(generator = "seller-id-generator")
    @GenericGenerator(
        name = "seller-id-generator",
        strategy="com.aksoftwares.e_commerce_backend.prefixes.SellerIdGenerator"
    )
    private String id;

    @Column(nullable= false)
    private String password;

    @Column(nullable = false)
    private String storeName;

    private String ownerName;
    private String phoneNumber;
    
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String supportEmail;

    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String pincode;
    private String country;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
