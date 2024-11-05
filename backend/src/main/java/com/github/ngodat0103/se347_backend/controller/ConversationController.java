package com.github.ngodat0103.se347_backend.controller;

import com.github.ngodat0103.se347_backend.dto.conversation.CreateConversationDto;
import com.github.ngodat0103.se347_backend.service.ConversationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/conversations")
@AllArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ConversationController {

  private ConversationService conversationService;

  @PostMapping(produces = "application/json", consumes = "application/json")
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("isAuthenticated()")
  public Mono<CreateConversationDto> createConversation(
      @Valid @RequestBody CreateConversationDto createConversationDto) {
    return conversationService.create(createConversationDto);
  }
}
