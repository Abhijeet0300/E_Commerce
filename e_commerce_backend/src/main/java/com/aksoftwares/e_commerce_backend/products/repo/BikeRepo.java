package com.aksoftwares.e_commerce_backend.products.repo;

import com.aksoftwares.e_commerce_backend.products.model.Bike;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BikeRepo extends MongoRepository<Bike, String> {

    @Query(" 'manufacturer' : ?0")
    List<Bike> findByManufacturer(String manufacturer);

    @Query(" 'model' : ?0 ")
    List<Bike> findByModel(String model);

    @Query(" 'bikeName' : ?0 ")
    List<Bike> findByBikeName(String bikeName);

    // ?0 refers to the first parameter (minPrice)
    // ?1 refers to the second parameter (maxPrice)
    @Query("{ 'price' : { $gte: ?0, $lte: ?1 } }")
    List<Bike> findBikesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("{ 'bikeName' : { $regex: ?0, $options: 'i' } }")
    List<Bike> searchByBikeName(String keyword);

    @Query("{ $or: [ " +
            "{ 'manufacturer' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'model' : { $regex: ?0, $options: 'i' } }, " +
            "{ 'bikeName' : { $regex: ?0, $options: 'i' } } " +
            "] }")
    List<Bike> searchAcrossMultipleFields(String keyword);
}
