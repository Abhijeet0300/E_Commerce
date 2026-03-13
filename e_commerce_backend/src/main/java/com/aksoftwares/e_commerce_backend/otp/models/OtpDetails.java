package com.aksoftwares.e_commerce_backend.otp.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("otps")
@Data
public class OtpDetails {

    @Id
    private String otpId;

    private String email;
    private String otp;

    @Indexed(expireAfter = "5m")
    private LocalDateTime createdDate;

    public OtpDetails(String email, String otp, LocalDateTime createdDate) {
        this.email = email;
        this.otp = otp;
        this.createdDate = createdDate;
    }
}
