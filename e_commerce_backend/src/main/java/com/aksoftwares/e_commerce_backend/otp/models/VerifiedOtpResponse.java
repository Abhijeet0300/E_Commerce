package com.aksoftwares.e_commerce_backend.otp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifiedOtpResponse {
    private boolean verified;
    private String message;
}
