package com.aksoftwares.e_commerce_backend.customer.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    private String customerId;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String phone;

    private String address;
    private String country;
    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
