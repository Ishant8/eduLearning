package com.education.eduAPI.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    private final Dotenv dotenv;

    public EnvConfig() {
        // Load .env file; specify directory or file if different
        dotenv = Dotenv.configure()
                .filename("config.env")
                .ignoreIfMissing()
                .load();
    }

    @Bean
    public Dotenv dotenv() {
        return dotenv;
    }
}

