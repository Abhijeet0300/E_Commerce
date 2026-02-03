package com.aksoftwares.e_commerce_backend.otp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;


@Repository
public interface OtpRepo extends JpaRepository<OtpVerification, Long>{
    Optional<OtpVerification> findByEmailAndOtp(String email, String otp);
    Optional<OtpVerification> findByEmail(String email);

    @Modifying
    @Transactional
    void deleteByEmail(String email);
}
