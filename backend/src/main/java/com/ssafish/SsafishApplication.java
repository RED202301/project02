package com.ssafish;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class SsafishApplication {

    public static void main(String[] args) {
        SpringApplication.run(SsafishApplication.class, args);
    }

}
