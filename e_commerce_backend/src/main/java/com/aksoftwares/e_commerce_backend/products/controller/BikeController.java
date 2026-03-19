package com.aksoftwares.e_commerce_backend.products.controller;

import com.aksoftwares.e_commerce_backend.constants.ApiConstant;
import com.aksoftwares.e_commerce_backend.products.model.Bike;
import com.aksoftwares.e_commerce_backend.products.responsemodel.BikeRegisterResponseModel;
import com.aksoftwares.e_commerce_backend.products.service.BikeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class BikeController {
    private final BikeService bikeService;

    public BikeController(BikeService bikeService) {
        this.bikeService = bikeService;
    }

    @PostMapping("/add-bike")
    public ResponseEntity<BikeRegisterResponseModel> addBike(@Valid @RequestBody Bike bike){
        BikeRegisterResponseModel responseModel = bikeService.addBike(bike);

        if(!responseModel.isSuccess()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseModel);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(responseModel);
    }
}
