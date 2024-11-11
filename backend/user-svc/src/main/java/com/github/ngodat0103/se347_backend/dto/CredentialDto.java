package com.github.ngodat0103.se347_backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CredentialDto {
  private String username;
  private String password;
}
