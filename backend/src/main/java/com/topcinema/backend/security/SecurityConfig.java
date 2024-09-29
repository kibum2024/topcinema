package com.topcinema.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화, 최신 방식
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll()  // /api/** 경로는 인증이 필요
                        .anyRequest().permitAll()  // 나머지는 허용
                );

        return http.build();
    }
}