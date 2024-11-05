package com.github.ngodat0103.se347_backend.controller;

import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.persistence.repository.UserRepository;
import com.github.ngodat0103.se347_backend.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {
  private UserService<UserDto> userService;
  private UserRepository userRepository;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Mono<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
    return userService.create(userDto);
  }

  @GetMapping(path = "/{id}")
  public Mono<UserDto> getUser(@PathVariable(value = "id") String id) {
    return userService.findById(id);
  }

  @PreAuthorize("isAuthenticated()")
  @SecurityRequirement(name = "bearerAuth")
  @GetMapping(path = "/me")
  public Mono<UserDto> getMe() {
    return userService.getMe();
  }
}
