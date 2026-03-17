package com.aksoftwares.e_commerce_backend.seller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisteredSellerResponse {
    private boolean success;
    private String message;
}
