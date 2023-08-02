package com.ssafish.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafish.web.filter.JwtExceptionFilter;
import com.ssafish.web.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class AuthenticationConfig {

    @Value("${jwt.secret}")
    private String secretKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/oauth/login").permitAll()
                // "/oauth/login" 경로에 대한 요청은 모든 사용자에게 허용합니다. 즉, 인증 없이도 접근할 수 있습니다.
//                .antMatchers(HttpMethod.GET, "/api/*").authenticated()
                // "/api/"로 시작하는 모든 GET 요청은 인증된 사용자만 허용합니다. 다른 HTTP 메서드에 대한 요청은 여기에 포함되지 않으며, 따라서 인증 없이도 접근할 수 있습니다.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtFilter(secretKey), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtExceptionFilter(objectMapper), JwtFilter.class)
                .build();
    }
}
