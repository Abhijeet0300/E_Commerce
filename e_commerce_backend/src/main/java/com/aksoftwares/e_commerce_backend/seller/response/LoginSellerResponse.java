package com.aksoftwares.e_commerce_backend.seller.response;

import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginSellerResponse {
    private boolean success;
    private String jwtToken = null;
    private String message;
    private Data data;
}
