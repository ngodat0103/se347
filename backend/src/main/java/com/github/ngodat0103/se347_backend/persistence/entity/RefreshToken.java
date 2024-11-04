package com.github.ngodat0103.se347_backend.persistence.entity;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "refresh_tokens")
@Getter
@Setter
public class RefreshToken {
  @MongoId private String id;
  private String refreshTokenValue;
  private LocalDateTime expiresAt;
  private String userId;
}
