package com.aksoftwares.e_commerce_backend.seller.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@lombok.Data
@NoArgsConstructor
@AllArgsConstructor
public class Data {
    private String sellerId;
    private String sellerName;
    private String email;
    private String storeName;
    private String phone;
    private String address;
    private String country;
}
