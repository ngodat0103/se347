package com.github.ngodat0103.javabackup.controller;

import com.github.ngodat0103.javabackup.dto.UserDto;
import com.github.ngodat0103.javabackup.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
}
