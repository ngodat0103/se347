package com.github.ngodat0103.se347_backend.persistence.repository;

import com.github.ngodat0103.se347_backend.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long > {
    Boolean existsByUserName(String userName);
    Boolean existsByEmailAddress(String emailAddress);
    User findByUserName(String username);
    User findByEmailAddress(String emailAddress);

}
