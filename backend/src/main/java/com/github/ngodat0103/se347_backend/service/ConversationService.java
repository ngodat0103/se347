package com.github.ngodat0103.se347_backend.service;

import com.github.ngodat0103.se347_backend.dto.conversation.CreateConversationDto;
import reactor.core.publisher.Mono;

public interface ConversationService {
  Mono<CreateConversationDto> create(CreateConversationDto createConversationDto);
}
