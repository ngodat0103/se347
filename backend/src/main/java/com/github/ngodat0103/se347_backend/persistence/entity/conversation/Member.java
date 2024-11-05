package com.github.ngodat0103.se347_backend.persistence.entity.conversation;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Member {
  private String userId;
  private String role;
}
