package com.aksoftwares.e_commerce_backend.customer.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerData {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String country;
}
