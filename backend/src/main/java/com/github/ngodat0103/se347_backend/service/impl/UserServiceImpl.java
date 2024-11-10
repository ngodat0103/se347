package com.github.ngodat0103.se347_backend.service.impl;

import static com.github.ngodat0103.se347_backend.exception.Util.*;

import com.github.ngodat0103.se347_backend.dto.CredentialDto;
import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.dto.mapper.UserMapper;
import com.github.ngodat0103.se347_backend.persistence.entity.User;
import com.github.ngodat0103.se347_backend.persistence.repository.UserRepository;
import com.github.ngodat0103.se347_backend.service.UserService;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService<UserDto> {
  private UserRepository userRepository;
  private UserMapper userMapper;
  private PasswordEncoder passwordEncoder;
  private JwtEncoder jwtEncoder;

  @Override
  public UserDto create(UserDto userDto) {
    String username = userDto.getUserName();
    String email = userDto.getEmailAddress();
    if (userRepository.existsByUserName(username)) {
      if (log.isDebugEnabled()) {
        log.debug("Username already exists");
      }
      throwConflictException(log, "User", "username", username);
    }
    if (userRepository.existsByEmailAddress(email)) {
      if (log.isDebugEnabled()) {
        log.debug("Email already exists");
      }
      throwConflictException(log, "User", "email", email);
    }
    User user = userMapper.toEntity(userDto);
    user.setCredential(passwordEncoder.encode(user.getCredential()));
    return userMapper.toDto(userRepository.save(user));
  }

  @Override
  public UserDto update(UserDto userDto) {
    return null;
  }

  @Override
  public UserDto delete(UserDto userDto) {
    return null;
  }

  @Override
  public UserDto findById(String id) {
    return null;
  }

  @Override
  public UserDto getMe() throws Throwable {
    Long id = Long.valueOf(getUserIdfromAuthentication());
    return userRepository
        .findById(id)
        .map(userMapper::toDto)
        .orElseThrow(() -> throwNotFoundException(log, "User", "id", id));
  }

  @Override
  public UserDto findByEmail(String email) {
    return null;
  }

  @Override
  public UserDto findByPhone(String phone) {
    return null;
  }

  @Override
  public UserDto findByAddress(String address) {
    return null;
  }

  @Override
  public OAuth2AccessTokenResponse login(CredentialDto credentialDto) {
    String username = credentialDto.getUsername();
    String password = credentialDto.getPassword();

    return userRepository
        .findByUserName(username)
        .map(
            user -> {
              if (passwordEncoder.matches(password, user.getCredential())) {
                JwtClaimsSet jwtClaimsSet =
                    JwtClaimsSet.builder()
                        .subject(user.getId().toString())
                        .expiresAt(Instant.now().plusSeconds(3600))
                        .audience(List.of("se347"))
                        .issuedAt(Instant.now())
                        .issuer("se347")
                        .build();

                JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(jwtClaimsSet);
                Jwt jwt = jwtEncoder.encode(jwtEncoderParameters);
                return OAuth2AccessTokenResponse.withToken(jwt.getTokenValue())
                    .tokenType(OAuth2AccessToken.TokenType.BEARER)
                    .scopes(Set.of("se347"))
                    .expiresIn(jwtClaimsSet.getExpiresAt().getEpochSecond())
                    .build();
              } else {
                throw new BadCredentialsException("Username or password is incorrect");
              }
            })
        .orElseThrow(() -> new BadCredentialsException("Username or password is incorrect"));
  }
}
