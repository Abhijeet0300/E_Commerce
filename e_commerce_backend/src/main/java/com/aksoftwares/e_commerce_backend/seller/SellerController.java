package com.aksoftwares.e_commerce_backend.seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("api/seller")
@CrossOrigin(origins = "http://localhost:5173")
public class SellerController {
    @Autowired
    private SellerService sellerService;

    @PostMapping("/register") 
    public ResponseEntity<String> registerSeller(@RequestBody Seller seller) {
        Seller registeredSeller = sellerService.registerSeller(seller);
        if(registeredSeller == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Seller already exists.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Seller registered successfully.");
    }
}
