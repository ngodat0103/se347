package com.github.ngodat0103.se347_backend.persistence.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document
@AllArgsConstructor
@NoArgsConstructor
public class User {
  @Id private String id;

  @Indexed(unique = true)
  private String username;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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
