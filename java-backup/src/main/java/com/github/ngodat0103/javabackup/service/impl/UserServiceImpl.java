package com.github.ngodat0103.javabackup.service.impl;

import static com.github.ngodat0103.javabackup.Util.*;

import com.github.ngodat0103.javabackup.dto.CredentialDto;
import com.github.ngodat0103.javabackup.dto.UserDto;
import com.github.ngodat0103.javabackup.dto.mapper.UserMapper;
import com.github.ngodat0103.javabackup.persistence.entity.RefreshToken;
import com.github.ngodat0103.javabackup.persistence.entity.User;
import com.github.ngodat0103.javabackup.persistence.repository.RefreshTokenRepository;
import com.github.ngodat0103.javabackup.persistence.repository.UserRepository;
import com.github.ngodat0103.javabackup.service.UserService;
import java.time.Duration;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService<UserDto> {
  private UserRepository userRepository;
  private UserMapper userMapper;
  private PasswordEncoder passwordEncoder;
  private RefreshTokenRepository refreshTokenRepository;
  private JwtEncoder jwtEncoder;

  @Override
  public Mono<UserDto> create(UserDto userDto) {
    User user = userMapper.toEntity(userDto);
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository
        .existsByUsername(user.getUsername())
        .flatMap(
            exists -> {
              if (exists) {
                return Mono.error(
                    throwConflictException(log, "User", "username", user.getUsername()));
              }
              return userRepository.existsByEmail(user.getEmail());
            })
        .flatMap(
            exists -> {
              if (exists) {
                return Mono.error(throwConflictException(log, "User", "email", user.getEmail()));
              }
              return userRepository.save(user);
            })
        .map(userMapper::toDto);
  }

  @Override
  public Mono<UserDto> update(UserDto userDto) {
    return null;
  }

  @Override
  public Mono<UserDto> delete(UserDto userDto) {
    return null;
  }

  @Override
  public Mono<UserDto> findById(Long id) {
    return null;
  }

  @Override
  public Mono<UserDto> findByUsername(String username) {
    return null;
  }

  @Override
  public Mono<UserDto> findByEmail(String email) {
    return null;
  }

  @Override
  public Mono<UserDto> findByPhone(String phone) {
    return null;
  }

  @Override
  public Mono<UserDto> findByAddress(String address) {
    return null;
  }

  @Override
  public Mono<OAuth2AccessTokenResponse> login(CredentialDto credentialDto) {
    String username = credentialDto.getUsername();
    String password = credentialDto.getPassword();
    return userRepository
        .findByUsername(username)
        .flatMap(
            user -> {
              if (passwordEncoder.matches(password, user.getPassword())) {
                return Mono.just(user);
              }
              return Mono.error(
                  HttpClientErrorException.Unauthorized.create(
                      HttpStatus.UNAUTHORIZED, "Unauthorized", null, null, null));
            })
        .flatMap(
            user -> {
              JwtClaimsSet claims = JwtClaimsSet.builder().subject(user.getUsername()).build();
              JwtEncoderParameters parameters = JwtEncoderParameters.from(claims);
              Jwt jwt = jwtEncoder.encode(parameters);
              String refreshTokenValue = RandomStringUtils.randomAlphanumeric(64);
              RefreshToken refreshToken = new RefreshToken();
              refreshToken.setRefreshTokenValue(refreshTokenValue);
              refreshToken.setUserId(user.getId());
              refreshToken.setExpiresAt(LocalDateTime.now().plus(Duration.ofHours(1)));
              return refreshTokenRepository
                  .save(refreshToken)
                  .map(
                      savedToken ->
                          OAuth2AccessTokenResponse.withToken(jwt.getTokenValue())
                              .tokenType(OAuth2AccessToken.TokenType.BEARER)
                              .refreshToken(savedToken.getRefreshTokenValue())
                              .expiresIn(3600)
                              .build());
            });
  }
}
