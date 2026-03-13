package com.aksoftwares.e_commerce_backend.customer.model;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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

    @Indexed(unique = true)
    private String phone;

    private String address;
    private String country;
    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
