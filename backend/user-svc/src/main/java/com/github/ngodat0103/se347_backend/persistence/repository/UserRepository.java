package com.github.ngodat0103.se347_backend.persistence.repository;

import com.github.ngodat0103.se347_backend.persistence.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  Boolean existsByUserName(String userName);

  Boolean existsByEmailAddress(String emailAddress);

  Optional<User> findByUserName(String username);

  User findByEmailAddress(String emailAddress);
}
