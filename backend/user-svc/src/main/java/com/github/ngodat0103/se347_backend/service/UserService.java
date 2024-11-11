package com.github.ngodat0103.se347_backend.service;

import com.github.ngodat0103.se347_backend.dto.CredentialDto;
import com.github.ngodat0103.se347_backend.exception.ConflictException;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;

public interface UserService<Dto> {
  Dto create(Dto dto) throws ConflictException;

  Dto update(Dto dto);

  Dto delete(Dto dto);

  Dto findById(String id);

  Dto getMe() throws Throwable;

  Dto findByEmail(String email);

  Dto findByPhone(String phone);

  Dto findByAddress(String address);

  OAuth2AccessTokenResponse login(CredentialDto credentialDto);
}
