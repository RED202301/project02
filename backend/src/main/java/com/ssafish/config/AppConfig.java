package com.ssafish.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class AppConfig {

    @Bean(name = "gameTaskExecutor", destroyMethod = "shutdown")
    public ThreadPoolTaskExecutor gameTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(50);
        executor.setMaxPoolSize(50);
        return executor;
    }
}
