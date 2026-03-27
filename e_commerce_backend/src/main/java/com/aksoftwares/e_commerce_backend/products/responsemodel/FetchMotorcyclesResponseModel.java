package com.aksoftwares.e_commerce_backend.products.responsemodel;

import java.util.List;

import com.aksoftwares.e_commerce_backend.products.model.Motorcycle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FetchMotorcyclesResponseModel {
    private boolean  success;
    private String message;
    private List<Motorcycle> data;
}
