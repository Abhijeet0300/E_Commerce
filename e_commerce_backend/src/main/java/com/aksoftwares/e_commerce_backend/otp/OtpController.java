package com.aksoftwares.e_commerce_backend.otp;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins= "http://localhost:5173")
public class OtpController {
    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpRepo otpRepo;

    @PostMapping("/generate-otp")
    public ResponseEntity<String> generateOtp(@RequestParam String email) {

        email = email.trim().toLowerCase();

        otpRepo.deleteByEmail(email);

        String otp = otpUtil.generateOtp();

        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmail(email);
        otpVerification.setOtp(otp);
        otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(5l));

        otpRepo.save(otpVerification);

        emailService.sendOtpEmail(email, otp);

        return ResponseEntity.ok("OTP sent successfully to" + email);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        email = email.trim().toLowerCase();
        otp = otp.trim();

        System.out.println("VERIFY OTP -> Email: " + email + " OTP: " + otp);


        Optional<OtpVerification> otpData = otpRepo.findByEmailAndOtp(email, otp);

        if(otpData.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Otp");
        }

        OtpVerification otpVerification = otpData.get();

        if(otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP expired");
        }

        otpRepo.delete(otpVerification);

        return ResponseEntity.ok("OTP verified successfully");
    }

}
