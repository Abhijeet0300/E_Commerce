package com.aksoftwares.e_commerce_backend.customer.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginCustomerResponse {
    private boolean success;
    private String jwtToken = null;
    private String message;
    private CustomerData data;
}
