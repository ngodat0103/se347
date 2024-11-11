package com.github.ngodat0103.se347_backend.controller;

import com.github.ngodat0103.se347_backend.dto.CredentialDto;
import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.service.UserService;
import com.nimbusds.jose.jwk.JWK;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/v1/users/auth")
public class AuthController {

  private final JWK jwk;
  private final UserService<UserDto> userService;

  @GetMapping(path = "/jwk", produces = "application/json")
  public String getJwk() {
    return jwk.toString();
  }

  @PostMapping(path = "/login")
  public OAuth2AccessTokenResponse login(@RequestBody @Valid CredentialDto credentialDto) {
    return userService.login(credentialDto);
  }
}
