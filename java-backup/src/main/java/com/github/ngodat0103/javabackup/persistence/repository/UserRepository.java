package com.github.ngodat0103.javabackup.persistence.repository;

import com.github.ngodat0103.javabackup.persistence.entity.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, Long> {
  Mono<Boolean> existsByUsername(String username);

  Mono<Boolean> existsByEmail(String email);

  Mono<User> findByUsername(String username);
}
