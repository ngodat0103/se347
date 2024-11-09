package com.github.ngodat0103.se347_backend.controller;


import com.nimbusds.jose.jwk.JWK;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/v1/users/auth")
public class AuthController {

    private final JWK jwk;
    @GetMapping(path = "/jwk",produces = "application/json")
    public String getJwk() {
        return jwk.toString();
    }
}
