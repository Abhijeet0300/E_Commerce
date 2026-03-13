package com.aksoftwares.e_commerce_backend.otp.service;

import com.aksoftwares.e_commerce_backend.otp.OtpConstants;
import com.aksoftwares.e_commerce_backend.otp.models.OtpDetails;
import com.aksoftwares.e_commerce_backend.otp.models.OtpResponse;
import com.aksoftwares.e_commerce_backend.otp.models.VerifiedOtpResponse;
import com.aksoftwares.e_commerce_backend.otp.models.VerifyOtp;
import com.aksoftwares.e_commerce_backend.otp.repo.OtpRepo;
import com.aksoftwares.e_commerce_backend.utils.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {
    @Autowired
    private OtpRepo repo;

    @Autowired
    private EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    public OtpResponse generateAndSendOtp(String email, String subjectText) {
        try {
            int otpNumber = 100000 + secureRandom.nextInt(900000);
            String otp = String.valueOf(otpNumber);

            repo.deleteByEmail(email);

            OtpDetails details = new OtpDetails(email, otp, LocalDateTime.now());
            repo.save(details);

            emailService.sendOtpEmail(email, otp, subjectText);
            return new OtpResponse(true, OtpConstants.OTP_SENT_SUCCESSFULLY.getValue());
        } catch (MessagingException e) {
            return new OtpResponse(false, OtpConstants.OTP_SENT_FAILED + e.getMessage());
        }
    }

    public VerifiedOtpResponse verifyOtp(VerifyOtp verifyOtp) {
        Optional<OtpDetails> details = repo.findByEmail(verifyOtp.getEmail());
        if (details.isPresent()) {
            OtpDetails detail = details.get();
            if (detail.getOtp().equals(verifyOtp.getOtp())) {
                return new VerifiedOtpResponse(true, OtpConstants.OTP_VERIFIED.getValue());
            } else {
                return new VerifiedOtpResponse(false, OtpConstants.INVALID_OTP.getValue());
            }
        }
        return new VerifiedOtpResponse(false, OtpConstants.OTP_VERIFIED_FAILED.getValue());
    }
}
