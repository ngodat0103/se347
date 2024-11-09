package com.github.ngodat0103.se347_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

import lombok.*;

@Getter
@Builder
public class UserDto  {
  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private Long id;
  @NotBlank
  @Size(max = 255)
  private String userName;

  @NotBlank
  @Size(max = 255)
  private String firstName;

  @NotBlank
  @Size(max = 255)
  private String lastName;

  @NotBlank
  @Email
  @Size(max = 255)
  private String emailAddress;

  @NotBlank
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Size(min = 8, max = 255)
  private String password;
}
