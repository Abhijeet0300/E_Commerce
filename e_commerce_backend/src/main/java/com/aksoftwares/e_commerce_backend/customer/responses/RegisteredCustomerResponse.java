package com.aksoftwares.e_commerce_backend.customer.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisteredCustomerResponse {
    private boolean registered;
    private String message;
}
