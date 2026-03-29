package com.aksoftwares.e_commerce_backend.handler;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.aksoftwares.e_commerce_backend.auth.service.CustomerPrincipal;
import com.aksoftwares.e_commerce_backend.auth.service.JWTService;
import com.aksoftwares.e_commerce_backend.customer.model.Customer;
import com.aksoftwares.e_commerce_backend.customer.repo.CustomerRepo;
import com.aksoftwares.e_commerce_backend.customer.responses.CustomerData;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import tools.jackson.databind.ObjectMapper;

@Component
public class OAuth2LoginClientSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final JWTService jwtService;
    private final CustomerRepo customerRepo;

    public OAuth2LoginClientSuccessHandler(JWTService jwtService, CustomerRepo customerRepo) {
        this.jwtService = jwtService;
        this.customerRepo = customerRepo;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
    

        Customer customer = customerRepo.findByEmail(email);

        if(customer == null) {
            customer = new Customer();

            customer.setEmail(email);
            customer.setName(name);
            customer.setCreatedAt(LocalDateTime.now());
            customer.setUpdatedAt(LocalDateTime.now());
            customer = customerRepo.save(customer);
        }

        CustomerPrincipal customerPrincipal = new CustomerPrincipal(customer);
        Authentication customAuthentication = new UsernamePasswordAuthenticationToken(customerPrincipal, null, customerPrincipal.getAuthorities());

        String token = jwtService.generateToken(customAuthentication);

        CustomerData customerData = new CustomerData(
                customer.getCustomerId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getCountry()
        );

        // 3. Convert the CustomerData object into a JSON string and URL-encode it
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonCustomerData = objectMapper.writeValueAsString(customerData);
        String encodedData = URLEncoder.encode(jsonCustomerData, StandardCharsets.UTF_8.toString());

        String frontendUrl = "http://localhost:5173/loginScreen?token=" + token + "&role=CUSTOMER&data=" + encodedData;
        getRedirectStrategy().sendRedirect(request, response, frontendUrl);
    }

    
}
