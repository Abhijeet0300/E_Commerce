package com.aksoftwares.e_commerce_backend.otp.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OtpResponse {
    private boolean success;
    private String message;
}
