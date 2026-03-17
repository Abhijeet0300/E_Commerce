package com.aksoftwares.e_commerce_backend.seller.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("seller")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seller {
    @Id
    private String id;

    private String ownerName;

    private String storeName;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String phone;

    private String password;

    private String address;
    private String country;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
