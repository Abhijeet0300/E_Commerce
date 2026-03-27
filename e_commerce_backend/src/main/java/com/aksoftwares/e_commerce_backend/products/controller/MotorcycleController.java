package com.aksoftwares.e_commerce_backend.products.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aksoftwares.e_commerce_backend.products.constants.MotorcycleConstants;
import com.aksoftwares.e_commerce_backend.products.model.Motorcycle;
import com.aksoftwares.e_commerce_backend.products.responsemodel.BikeRegisterResponseModel;
import com.aksoftwares.e_commerce_backend.products.responsemodel.FetchMotorcyclesResponseModel;
import com.aksoftwares.e_commerce_backend.products.service.MotorcycleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/product")
public class MotorcycleController {

    private final MotorcycleService motorcycleService;

    public MotorcycleController(MotorcycleService motorcycleService) {
        this.motorcycleService = motorcycleService;
    }

    @PostMapping("/add-motorcycle")
    public ResponseEntity<BikeRegisterResponseModel> addBike(@Valid @RequestBody Motorcycle bike) {
        BikeRegisterResponseModel responseModel = motorcycleService.addBike(bike);

        if (!responseModel.isSuccess()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseModel);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(responseModel);
    }

    @GetMapping("/get-motorcycles")
    public ResponseEntity<FetchMotorcyclesResponseModel> getMotorcycles(@RequestParam String sellerId) {
        FetchMotorcyclesResponseModel responseModel = motorcycleService.getMotorcycles(sellerId);

        if(responseModel.isSuccess()) {
            return ResponseEntity.status(HttpStatus.OK).body(responseModel);
        } else if(responseModel.getMessage().equals(MotorcycleConstants.MOTORCYCLES_NOT_FOUND.getValue())) {
            return ResponseEntity.status(HttpStatus.OK).body(responseModel);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseModel);
        }
    }
}
