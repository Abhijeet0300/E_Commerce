package com.aksoftwares.e_commerce_backend.auth.service;

import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import com.aksoftwares.e_commerce_backend.seller.repo.SellerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SellerDetailsService implements UserDetailsService {

    @Autowired
    private SellerRepo sellerRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Seller seller = sellerRepo.findByEmail(email);
        if(seller == null){
            throw new UsernameNotFoundException("Seller not found.");
        }

        return new SellerPrincipal(seller);
    }
}
