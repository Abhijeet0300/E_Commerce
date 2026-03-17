package com.aksoftwares.e_commerce_backend.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class JWTService {

    private static final String SECRET_KEY = "SKJFKJSDKSDIHSDKJ12E344SNDFKJDSN58";

    private static final long EXPIRATION_TIME = 86400000;

    private Key getSigninKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        String roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigninKey())
                .compact();

    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSigninKey()) // Uses your secret key to verify the signature
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractRoles(String token) {
        return extractAllClaims(token).get("roles", String.class);
    }
}
