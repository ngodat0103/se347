package com.github.ngodat0103.se347_backend.persistence.entity.conversation;

import java.util.Set;
import lombok.Data;

// @Document(collection = "messages")
@Data
public class Message {
  private String conversationId;
  private String fromUserId;
  private String status;
  private Set<String> content;
  private String type;
  private String description;
}
