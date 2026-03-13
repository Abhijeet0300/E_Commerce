package com.aksoftwares.e_commerce_backend.otp.repo;

import com.aksoftwares.e_commerce_backend.otp.models.OtpDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepo extends MongoRepository<OtpDetails, String> {

    @Query("{'email': ?0}")
    Optional<OtpDetails> findByEmail(String email);

    void deleteByEmail(String email);
}
