package com.aksoftwares.e_commerce_backend.otp;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class OtpUtil {
    public String generateOtp() {
        SecureRandom secureRandom = new SecureRandom();
        int otp = secureRandom.nextInt(900000) + 100000;
        return String.valueOf(otp);
    }
}
