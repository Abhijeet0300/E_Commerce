package com.aksoftwares.e_commerce_backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepo extends JpaRepository<User, String>{

    @Query("select u from User u where u.email = :email")
    User findByEmail(String email);

    @Query("select count(u) > 0 from User u where u.email = :email")
    boolean existsByEmail(@Param("email") String email);
}
