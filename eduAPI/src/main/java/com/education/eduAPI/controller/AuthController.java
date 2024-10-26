package com.education.eduAPI.controller;


import com.education.eduAPI.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    JWTService jwtService;

    @Autowired
    public AuthController(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String,Boolean>> validate(HttpServletRequest request){
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                boolean isValid = jwtService.isTokenValid(token);
                return ResponseEntity.ok(Map.of("valid", isValid));
            }
            return ResponseEntity.ok(Map.of("valid", false));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("valid", false));
        }
    }
}
