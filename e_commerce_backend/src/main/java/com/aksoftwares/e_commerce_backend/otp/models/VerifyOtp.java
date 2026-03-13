package com.aksoftwares.e_commerce_backend.otp.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyOtp {
    private String email;
    private String otp;
}
