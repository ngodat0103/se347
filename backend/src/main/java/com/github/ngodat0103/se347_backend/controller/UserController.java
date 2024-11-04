package com.github.ngodat0103.se347_backend.controller;

import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {
  private UserService<UserDto> userService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Mono<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
    return userService.create(userDto);
  }

  @PreAuthorize("isAuthenticated()")
  @SecurityRequirement(name = "bearerAuth")
  @GetMapping(path = "/me")
  public Mono<UserDto> getMe(BearerTokenAuthentication authentication) {
    return userService.findById(authentication.getPrincipal().toString());
  }
}
