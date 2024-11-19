package com.github.ngodat0103.usersvc.dto;

import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CredentialDto {
  @Email(message = "Email should be valid")
  private String email;

  private String password;
}
