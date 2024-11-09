package com.github.ngodat0103.se347_backend.controller;

import com.github.ngodat0103.se347_backend.dto.CredentialDto;
import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {
  private UserService<UserDto> userService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public UserDto createUser(@Valid @RequestBody UserDto userDto) {
    return userService.create(userDto);
  }

  @GetMapping(path = "/{id}")
  public UserDto getUser(@PathVariable(value = "id") String id) {
    return userService.findById(id);
  }

  @PreAuthorize("isAuthenticated()")
  @SecurityRequirement(name = "bearerAuth")
  @GetMapping(path = "/me")
  public UserDto getMe() {
    return userService.getMe();
  }



  @PostMapping(path = "/login")
    public OAuth2AccessTokenResponse login(@RequestBody @Valid CredentialDto credentialDto) {
        return userService.login(credentialDto);

    }
}
