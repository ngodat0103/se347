package com.github.ngodat0103.se347_backend.service.impl;

import static com.github.ngodat0103.se347_backend.Util.*;

import com.github.ngodat0103.se347_backend.dto.conversation.CreateConversationDto;
import com.github.ngodat0103.se347_backend.dto.mapper.ConversationMapper;
import com.github.ngodat0103.se347_backend.persistence.entity.conversation.Conversation;
import com.github.ngodat0103.se347_backend.persistence.entity.conversation.Member;
import com.github.ngodat0103.se347_backend.persistence.repository.ConversationRepository;
import com.github.ngodat0103.se347_backend.persistence.repository.UserRepository;
import com.github.ngodat0103.se347_backend.service.ConversationService;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
@Slf4j
public class ConversationServiceImpl implements ConversationService {
  private ConversationRepository conversationRepository;
  private ConversationMapper conversationMapper;
  private UserRepository userRepository;

  @Override
  public Mono<CreateConversationDto> create(CreateConversationDto createConversationDto) {
    String conversationName = createConversationDto.getConversationName();
    Set<String> userIds = createConversationDto.getUserIds();
    return conversationRepository
        .existsByConversationName(conversationName)
        .flatMap(exists -> {
            if(exists){
                return Mono.error(throwConflictException(log,"Conversation","conversationName",conversationName));
            }
            return ReactiveSecurityContextHolder.getContext();
        })
        .map(securityContext -> securityContext.getAuthentication().getName())
        .flatMap(
            ownerId -> {
              Conversation conversation = conversationMapper.toEntity(createConversationDto);
              return userRepository
                  .findByIdIn(userIds)
                  .map(
                      user -> {
                        if (user.getId().equals(ownerId)) {
                          return new Member(user.getId(), "CHAT-OWNER");
                        }
                        return new Member(user.getId(), "Member");
                      })
                  .collect(Collectors.toSet())
                  .flatMap(
                      members -> {
                        conversation.setMembers(members);
                        return conversationRepository
                            .save(conversation)
                            .map(conversationMapper::toDto);
                      });
            });
  }
}
