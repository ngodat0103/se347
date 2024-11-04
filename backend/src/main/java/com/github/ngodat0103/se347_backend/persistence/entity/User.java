package com.github.ngodat0103.se347_backend.persistence.entity;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Getter
@Setter
@Document(collection = "users")
public class User {
  @MongoId private String id;

  @Indexed(unique = true)
  private String username;

  private String password;

  @Indexed(unique = true)
  @Field
  private String email;

  @Field private String fullName;
  @Field private String phoneNumber;

  @Field(name = "created_at")
  private LocalDateTime createdAt;

  @Field(name = "updated_at")
  private LocalDateTime updatedAt;
}
