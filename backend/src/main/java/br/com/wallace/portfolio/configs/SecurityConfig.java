package br.com.wallace.portfolio.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/swagger/**",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/h2-console/**"
                ).permitAll()
                .anyRequest().permitAll()
            );

        return http.build();
    }
}

