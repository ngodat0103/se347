package com.github.ngodat0103.usersvc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.ngodat0103.usersvc.persistence.document.Account;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Locale;
import lombok.*;

@Getter
@Builder
public class AccountDto {
  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private String accountId;

  @NotNull(message = "Nick name should not be null")
  private String nickName;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private String pictureUrl;

  @NotBlank
  @Email
  @Size(max = 255)
  private String email;

  @NotBlank
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Size(min = 8, max = 255)
  private String password;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private Account.AccountStatus accountStatus;

  private Locale locale;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private String zoneInfo;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private boolean emailVerified;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private LocalDateTime lastUpdatedDate;
}
