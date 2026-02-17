package com.aksoftwares.e_commerce_backend.products;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Locale.Category;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Products {
    @Id
    @GeneratedValue(generator= "product-id-generator")
    @GenericGenerator(
        name = "product-id-generator",
        strategy = "com.aksoftwares.e_commerce_backend.prefixes.ProductIdGenerator"
    )
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discountPrice;

    @Column(nullable= false)
    private Integer stockQuantity;

    @Column(unique= true)
    private String sku;

    private String brand;

    private Double rating = 0.0;

    private Integer totalReviews = 0;

    private Boolean isActive = true;
    
    private String sellerId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
