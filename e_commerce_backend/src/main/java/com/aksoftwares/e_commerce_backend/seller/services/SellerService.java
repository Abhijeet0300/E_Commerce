package com.aksoftwares.e_commerce_backend.seller.services;

import com.aksoftwares.e_commerce_backend.auth.service.JWTService;
import com.aksoftwares.e_commerce_backend.seller.model.LoginRequest;
import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import com.aksoftwares.e_commerce_backend.seller.repo.SellerRepo;
import com.aksoftwares.e_commerce_backend.seller.response.Data;
import com.aksoftwares.e_commerce_backend.seller.response.LoginSellerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SellerService {

    private final SellerRepo sellerRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public SellerService(
            SellerRepo sellerRepo,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JWTService jwtService
    ) {
        this.sellerRepo = sellerRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public boolean doesSellerExist(String email) {
        return sellerRepo.findByEmail(email) != null;
    }

    public Seller registerSeller(Seller seller) {
        String rawPassword = seller.getPassword();
        String hashedPassword = passwordEncoder.encode(rawPassword);

        seller.setPassword(hashedPassword);
        LocalDateTime now = LocalDateTime.now();

        seller.setCreatedAt(now);
        seller.setUpdatedAt(now);

        return sellerRepo.save(seller);
    }

    public ResponseEntity<LoginSellerResponse> loginSeller(LoginRequest loginRequest) {
        LoginSellerResponse loginSellerResponse = new LoginSellerResponse();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            String jwtToken = jwtService.generateToken(authentication);
            Seller seller = sellerRepo.findByEmail(loginRequest.getEmail());

            Data data =  new Data();
            data.setSellerId(seller.getId());
            data.setEmail(seller.getEmail());
            data.setCountry(seller.getCountry());
            data.setPhone(seller.getPhone());
            data.setAddress(seller.getAddress());
            data.setOwnerName(seller.getOwnerName());
            data.setStoreName(seller.getStoreName());

            loginSellerResponse.setSuccess(true);
            loginSellerResponse.setJwtToken(jwtToken);
            loginSellerResponse.setMessage("Successfully logged in.");
            loginSellerResponse.setData(data);

            return  ResponseEntity.status(HttpStatus.OK).body(loginSellerResponse);
        } catch (AuthenticationException e) {
            loginSellerResponse.setSuccess(false);
            loginSellerResponse.setMessage("Invalid email or password.");
            loginSellerResponse.setData(null);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginSellerResponse);
        }
    }
}
