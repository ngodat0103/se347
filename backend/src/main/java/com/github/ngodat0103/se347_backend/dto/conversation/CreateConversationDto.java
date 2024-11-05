package com.github.ngodat0103.se347_backend.dto.conversation;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.ngodat0103.se347_backend.persistence.entity.conversation.Member;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateConversationDto {
  @NotNull(message = "conversationName is required")
  private String conversationName;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private String id;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Set<String> userIds;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private Set<Member> members;
}
