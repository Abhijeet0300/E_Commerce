package com.aksoftwares.e_commerce_backend.products.service;

import com.aksoftwares.e_commerce_backend.products.model.Bike;
import com.aksoftwares.e_commerce_backend.products.repo.BikeRepo;
import com.aksoftwares.e_commerce_backend.products.responsemodel.BikeRegisterResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BikeService {
    private final BikeRepo bikeRepo;
    public BikeService(BikeRepo bikeRepo) {
        this.bikeRepo = bikeRepo;
    }

    public BikeRegisterResponseModel addBike(Bike bike) {
        try {
            bikeRepo.save(bike);
            return new BikeRegisterResponseModel(true, "Successfully added a new bike.");

        } catch (Exception e) {
            return new BikeRegisterResponseModel(false, "Failed to add bike. Please try again.");
        }
    }
}
