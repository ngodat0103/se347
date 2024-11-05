package com.github.ngodat0103.se347_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserDto implements Serializable {
  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private String id;

  @NotNull(message = "Username is required")
  //    @Min(value = 3, message = "Username must be at least 3 characters")
  private String username;

  @Min(value = 8, message = "Password must be at least 8 characters")
  @NotNull(message = "Password is required")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;

  @NotNull(message = "Email is required")
  @Email(message = "Email is invalid")
  private String email;

  @NotNull(message = "Full name is required")
  private String fullName;

  @NotNull(message = "Phone number is required")
  @Min(value = 10, message = "Phone number must be at least 10 characters")
  private String phoneNumber;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  @DateTimeFormat
  private LocalDateTime createdAt;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private LocalDateTime updatedAt;
}
