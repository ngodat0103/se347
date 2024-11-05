package com.github.ngodat0103.se347_backend.dto.mapper;

import com.github.ngodat0103.se347_backend.dto.conversation.CreateConversationDto;
import com.github.ngodat0103.se347_backend.persistence.entity.conversation.Conversation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConversationMapper {
  Conversation toEntity(CreateConversationDto createConversationDto);

  CreateConversationDto toDto(Conversation conversation);
}
