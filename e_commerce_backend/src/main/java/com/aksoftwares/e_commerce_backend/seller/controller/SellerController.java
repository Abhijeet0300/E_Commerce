package com.aksoftwares.e_commerce_backend.seller.controller;

import com.aksoftwares.e_commerce_backend.constants.ApiConstant;
import com.aksoftwares.e_commerce_backend.seller.model.LoginRequest;
import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import com.aksoftwares.e_commerce_backend.seller.response.Data;
import com.aksoftwares.e_commerce_backend.seller.response.LoginSellerResponse;
import com.aksoftwares.e_commerce_backend.seller.response.RegisteredSellerResponse;
import com.aksoftwares.e_commerce_backend.seller.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;

    private final AuthenticationManager authenticationManager;

    public SellerController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }


    @PostMapping("/register")
    public ResponseEntity<RegisteredSellerResponse> register(@RequestBody Seller seller) {
        RegisteredSellerResponse registeredSellerResponse = new RegisteredSellerResponse();

        if(sellerService.doesSellerExist(seller.getEmail())) {
            registeredSellerResponse.setSuccess(false);
            registeredSellerResponse.setMessage("Seller with this email already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registeredSellerResponse);
        }

        Seller newSeller = sellerService.registerSeller(seller);
        if(newSeller == null) {
            registeredSellerResponse.setSuccess(false);
            registeredSellerResponse.setMessage("Failed to register.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(registeredSellerResponse);
        }

        registeredSellerResponse.setSuccess(true);
        registeredSellerResponse.setMessage("Successfully registered.");
        return  ResponseEntity.status(HttpStatus.CREATED).body(registeredSellerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginSellerResponse> loginSeller(@RequestBody LoginRequest loginRequest) {
        return sellerService.loginSeller(loginRequest);
    }
}
