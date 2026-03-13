package com.aksoftwares.e_commerce_backend.otp.controller;

import com.aksoftwares.e_commerce_backend.otp.OtpConstants;
import com.aksoftwares.e_commerce_backend.otp.models.OtpResponse;
import com.aksoftwares.e_commerce_backend.otp.models.VerifiedOtpResponse;
import com.aksoftwares.e_commerce_backend.otp.models.VerifyOtp;
import com.aksoftwares.e_commerce_backend.otp.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:5173")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send-otp")
    public ResponseEntity<OtpResponse> sendOtp(@RequestParam("email") String email) {

        if(!StringUtils.hasText(email)) {
            OtpResponse otpResponse = new OtpResponse();
            otpResponse.setSuccess(false);
            otpResponse.setMessage("Please enter your email");
            return ResponseEntity.badRequest().body(otpResponse);
        }

        OtpResponse response = otpService.generateAndSendOtp(email, OtpConstants.EMAIL_VERIFICATION.getValue());
        if(response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<VerifiedOtpResponse> verifyOtp(@RequestBody VerifyOtp verifyOtp) {
        VerifiedOtpResponse response = otpService.verifyOtp(verifyOtp);
        if(response.isVerified()) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
