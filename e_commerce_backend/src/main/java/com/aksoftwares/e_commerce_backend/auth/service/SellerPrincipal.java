package com.aksoftwares.e_commerce_backend.auth.service;

import com.aksoftwares.e_commerce_backend.seller.model.Seller;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class SellerPrincipal implements UserDetails {
    private Seller seller;

    public SellerPrincipal(Seller seller) {
        this.seller = seller;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("SELLER"));
    }

    @Override
    public @Nullable String getPassword() {
        return seller.getPassword();
    }

    @Override
    public String getUsername() {
        return seller.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
