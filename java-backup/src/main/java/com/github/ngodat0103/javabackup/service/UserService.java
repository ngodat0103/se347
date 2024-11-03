package com.github.ngodat0103.javabackup.service;

import com.github.ngodat0103.javabackup.dto.CredentialDto;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import reactor.core.publisher.Mono;

public interface UserService<Dto> {
  Mono<Dto> create(Dto dto);

  Mono<Dto> update(Dto dto);

  Mono<Dto> delete(Dto dto);

  Mono<Dto> findById(Long id);

  Mono<Dto> findByUsername(String username);

  Mono<Dto> findByEmail(String email);

  Mono<Dto> findByPhone(String phone);

  Mono<Dto> findByAddress(String address);

  Mono<OAuth2AccessTokenResponse> login(CredentialDto credentialDto);
}
