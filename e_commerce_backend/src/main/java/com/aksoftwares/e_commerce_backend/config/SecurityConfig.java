package com.aksoftwares.e_commerce_backend.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.aksoftwares.e_commerce_backend.auth.MultiCollectionAuthenticationProvider;
import com.aksoftwares.e_commerce_backend.filter.JwtFilter;
import com.aksoftwares.e_commerce_backend.handler.OAuth2LoginClientSuccessHandler;

@Configuration
public class SecurityConfig {

    private final MultiCollectionAuthenticationProvider customAuthenticationProvider;
    private final OAuth2LoginClientSuccessHandler oauth2Auth2LoginClientSuccessHandler;
    private final JwtFilter jwtFilter;

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    public SecurityConfig(
        MultiCollectionAuthenticationProvider customAuthenticationProvider,
        OAuth2LoginClientSuccessHandler oAuth2LoginClientSuccessHandler,
        JwtFilter jwtFilter
    ) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.oauth2Auth2LoginClientSuccessHandler = oAuth2LoginClientSuccessHandler;
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                         auth.requestMatchers(
                            "/api/seller/register",
                            "/api/seller/login",
                            "/api/customer/register", 
                            "/api/customer/login",
                            "/api/auth/google-init",
                            "/api/otp/send-otp",
                            "/api/otp/verify-otp"
                        ).permitAll()
                                 .anyRequest().authenticated()
                )
                .oauth2Login(oAuth2 ->
                    oAuth2.successHandler(oauth2Auth2LoginClientSuccessHandler)
                )
                .exceptionHandling(exception -> exception
                    .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                )
        )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();

    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

        authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOrigins(List.of(allowedOrigins));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
