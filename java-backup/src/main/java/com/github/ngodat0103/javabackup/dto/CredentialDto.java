package com.github.ngodat0103.javabackup.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CredentialDto {
  private String username;
  private String password;
}
