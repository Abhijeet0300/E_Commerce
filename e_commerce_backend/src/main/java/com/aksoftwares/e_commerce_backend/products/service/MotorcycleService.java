package com.aksoftwares.e_commerce_backend.products.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.aksoftwares.e_commerce_backend.products.constants.MotorcycleConstants;
import com.aksoftwares.e_commerce_backend.products.model.Motorcycle;
import com.aksoftwares.e_commerce_backend.products.repo.MotorcycleRepo;
import com.aksoftwares.e_commerce_backend.products.responsemodel.BikeRegisterResponseModel;
import com.aksoftwares.e_commerce_backend.products.responsemodel.FetchMotorcyclesResponseModel;

@Service
public class MotorcycleService {
    private final MotorcycleRepo motorcycleRepo;
    public MotorcycleService(MotorcycleRepo motorcycleRepo) {
        this.motorcycleRepo = motorcycleRepo;
    }

    public BikeRegisterResponseModel addBike(Motorcycle bike) {
        try {
            bike.setStatus("In Stock");
            Motorcycle newBike = motorcycleRepo.save(bike);
            if(newBike == null) {
                return new BikeRegisterResponseModel(false, "Failed to add motorcycle.");
            }
            return new BikeRegisterResponseModel(true, "Successfully added a new bike.");

        } catch (Exception e) {
            return new BikeRegisterResponseModel(false, "Failed to add bike. Please try again.");
        }
    }

    public FetchMotorcyclesResponseModel getMotorcycles(String sellerId) {
        FetchMotorcyclesResponseModel responseModel = new FetchMotorcyclesResponseModel();
        try {
            Optional<List<Motorcycle>> motorcycle = motorcycleRepo.findBySellerId(sellerId);
            if(motorcycle.isPresent()) {
                responseModel.setSuccess(true);
                responseModel.setData(motorcycle.get());
                responseModel.setMessage(MotorcycleConstants.MOTORCYCLES_FOUND.getValue());
            } else {
                responseModel.setSuccess(false);
                responseModel.setMessage(MotorcycleConstants.MOTORCYCLES_NOT_FOUND.getValue());
                responseModel.setData(null);
            }
        } catch(Exception e) {
            responseModel.setSuccess(false);
            responseModel.setMessage(MotorcycleConstants.UNABLE_TO_FETCH.getValue());
            responseModel.setData(null);
        }
        return responseModel;
    }
}
