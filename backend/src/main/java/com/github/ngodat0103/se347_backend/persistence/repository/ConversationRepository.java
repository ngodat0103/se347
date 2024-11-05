package com.github.ngodat0103.se347_backend.persistence.repository;

import com.github.ngodat0103.se347_backend.persistence.entity.conversation.Conversation;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ConversationRepository extends ReactiveMongoRepository<Conversation, String> {
  Mono<Boolean> existsByConversationName(String conversationName);
}
