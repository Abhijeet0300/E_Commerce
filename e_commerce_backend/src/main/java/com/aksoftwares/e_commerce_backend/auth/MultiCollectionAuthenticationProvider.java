package com.aksoftwares.e_commerce_backend.auth;

import com.aksoftwares.e_commerce_backend.auth.service.CustomerDetailsService;
import com.aksoftwares.e_commerce_backend.auth.service.SellerDetailsService;
import org.jspecify.annotations.Nullable;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class MultiCollectionAuthenticationProvider implements AuthenticationProvider {

    private final SellerDetailsService sellerDetailsService;

    private final CustomerDetailsService customerDetailsService;

    private final PasswordEncoder passwordEncoder;

    public MultiCollectionAuthenticationProvider(
            SellerDetailsService sellerDetailsService,
            CustomerDetailsService customerDetailsService,
            PasswordEncoder passwordEncoder
    ) {
        this.sellerDetailsService = sellerDetailsService;
        this.customerDetailsService = customerDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public @Nullable Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserDetails userDetails = null;

        try {
            userDetails = sellerDetailsService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            try {
                userDetails = customerDetailsService.loadUserByUsername(username);
            } catch (UsernameNotFoundException e1) {
                throw new BadCredentialsException("Invalid username or password.");
            }
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password.");
        }
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                password,
                userDetails.getAuthorities()
        );
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
