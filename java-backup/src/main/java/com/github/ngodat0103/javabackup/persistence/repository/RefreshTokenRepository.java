package com.github.ngodat0103.javabackup.persistence.repository;

import com.github.ngodat0103.javabackup.persistence.entity.RefreshToken;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface RefreshTokenRepository extends ReactiveMongoRepository<RefreshToken, String> {
  Mono<RefreshToken> findByRefreshTokenValue(String refreshTokenValue);
}
