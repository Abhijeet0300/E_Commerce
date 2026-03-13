package com.aksoftwares.e_commerce_backend.otp;

public enum OtpConstants {

    EMAIL_VERIFICATION ("Verify Your Email Address"),
    OTP_SENT_SUCCESSFULLY ("OTP sent successfully."),
    OTP_SENT_FAILED ("Failed to send OTP."),
    OTP_VERIFIED ("OTP verified."),
    OTP_VERIFIED_FAILED ("Failed to verify OTP."),
    INVALID_OTP ("Invalid OTP");

    private final String value;

    OtpConstants(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
