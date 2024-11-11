package com.github.ngodat0103.se347_backend.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.dto.mapper.UserMapper;
import com.github.ngodat0103.se347_backend.dto.mapper.UserMapperImpl;
import com.github.ngodat0103.se347_backend.exception.ConflictException;
import com.github.ngodat0103.se347_backend.persistence.entity.User;
import com.github.ngodat0103.se347_backend.persistence.repository.UserRepository;
import java.util.Random;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

public class UserServiceImplTest {
  private UserRepository userRepository;
  private UserServiceImpl userService;
  private final Faker faker = new Faker();
  private final UserMapper userMapper = new UserMapperImpl();

  private UserDto userDtoFake;

  @BeforeEach
  void setUp() {

    Name user = faker.name();
    userDtoFake =
        UserDto.builder()
            .userName(user.username())
            .firstName(user.firstName())
            .lastName(user.lastName())
            .emailAddress(faker.internet().emailAddress())
            .password(faker.internet().password())
            .build();

    userRepository = Mockito.mock(UserRepository.class);
    JwtEncoder jwtEncoder = Mockito.mock(NimbusJwtEncoder.class);
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    this.userService = new UserServiceImpl(userRepository, userMapper, passwordEncoder, jwtEncoder);
  }

  @Test
  void createUserWhenNotExistsThenReturnSuccessful() throws Throwable {
    User user = userMapper.toEntity(userDtoFake);
    user.setId(new Random().nextLong());

    when(userRepository.existsByUserName(user.getUserName())).thenReturn(false);
    when(userRepository.existsByEmailAddress(userDtoFake.getEmailAddress())).thenReturn(false);
    when(userRepository.save(any(User.class))).thenReturn(user);
    UserDto result = userService.create(userDtoFake);

    assertEquals(result.getUserName(), userDtoFake.getUserName());
    assertEquals(result.getFirstName(), userDtoFake.getFirstName());
    assertEquals(result.getLastName(), userDtoFake.getLastName());
    assertEquals(result.getEmailAddress(), userDtoFake.getEmailAddress());
    assertNotNull(result.getId());
  }

  @Test
  void createUserWhenExistingUsernameThenThrowConflictException() {

    when(userRepository.existsByUserName(userDtoFake.getUserName())).thenReturn(true);

    assertThrows(ConflictException.class, () -> userService.create(userDtoFake));
  }

  @Test
  void CreateUserWhenExistingEmailThenThrowConflictException() {
    when(userRepository.existsByUserName(userDtoFake.getUserName())).thenReturn(false);
    when(userRepository.existsByEmailAddress(userDtoFake.getEmailAddress())).thenReturn(true);

    assertThrows(ConflictException.class, () -> userService.create(userDtoFake));
  }
}
