package com.aksoftwares.e_commerce_backend.filter;

import com.aksoftwares.e_commerce_backend.auth.service.CustomerDetailsService;
import com.aksoftwares.e_commerce_backend.auth.service.JWTService;
import com.aksoftwares.e_commerce_backend.auth.service.SellerDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final SellerDetailsService sellerDetailsService;
    private CustomerDetailsService customerDetailsService;

    public JwtFilter(JWTService jwtService,  CustomerDetailsService customerDetailsService, SellerDetailsService sellerDetailsService) {
        this.jwtService = jwtService;
        this.customerDetailsService = customerDetailsService;
        this.sellerDetailsService = sellerDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtService.extractUsername(token);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if(jwtService.validateToken(token)) {
                String rolesString = jwtService.extractRoles(token);
                UserDetails userDetails = null;

                try {
                    if(rolesString.contains("SELLER")) {
                        userDetails = sellerDetailsService.loadUserByUsername(username);
                    } else  if(rolesString.contains("CUSTOMER")) {
                        userDetails = customerDetailsService.loadUserByUsername(username);
                    }
                } catch (Exception e) {
                    filterChain.doFilter(request, response);
                    return;
                }

                if(userDetails != null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
