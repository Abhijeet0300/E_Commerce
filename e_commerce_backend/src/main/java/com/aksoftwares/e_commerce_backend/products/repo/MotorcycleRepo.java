package com.aksoftwares.e_commerce_backend.products.repo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.aksoftwares.e_commerce_backend.products.model.Motorcycle;

@Repository
public interface MotorcycleRepo extends MongoRepository<Motorcycle, String> {

    @Query(" 'manufacturer' : ?0")
    List<Motorcycle> findByManufacturer(String manufacturer);

    @Query(" 'model' : ?0 ")
    List<Motorcycle> findByModel(String model);

    @Query(" 'sellerId' : ?0 ")
    Optional<List<Motorcycle>> findBySellerId(String sellerId);

    @Query(" 'bikeName' : ?0 ")
    List<Motorcycle> findByBikeName(String bikeName);

    // ?0 refers to the first parameter (minPrice)
    // ?1 refers to the second parameter (maxPrice)
    @Query("{ 'price' : { $gte: ?0, $lte: ?1 } }")
    List<Motorcycle> findBikesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("{ 'bikeName' : { $regex: ?0, $options: 'i' } }")
    List<Motorcycle> searchByBikeName(String keyword);

    @Query("{ $or: [ " +
            "{ 'manufacturer' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'model' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'bikeName' : { $regex: ?0, $options: 'i' } } " +
            "] }")
    List<Motorcycle> searchAcrossMultipleFields(String keyword);
}
