package com.github.ngodat0103.javabackup.dto.mapper;

import com.github.ngodat0103.javabackup.dto.UserDto;
import com.github.ngodat0103.javabackup.persistence.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
  User toEntity(UserDto dto);

  UserDto toDto(User entity);
}
