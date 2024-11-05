package com.github.ngodat0103.se347_backend.persistence.entity.conversation;

import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "conversations")
@Getter
@Setter
public class Conversation {
  @Id private String id;

  @Indexed(unique = true)
  private String conversationName;

  private Set<Member> members;
  private Message lastMessage;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
