package com.github.ngodat0103.se347_backend.dto.mapper;

import com.github.ngodat0103.se347_backend.dto.UserDto;
import com.github.ngodat0103.se347_backend.persistence.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
  @Mapping(target = "password", source = "credential")
  UserDto toDto(User user);

  @Mapping(target = "lowerUserName", expression = "java(dto.getUserName().toLowerCase())")
  @Mapping(target = "lowerFirstName", expression = "java(dto.getFirstName().toLowerCase())")
  @Mapping(target = "lowerLastName", expression = "java(dto.getLastName().toLowerCase())")
  @Mapping(target = "lowerEmailAddress", expression = "java(dto.getEmailAddress().toLowerCase())")
  @Mapping(target = "credential",source = "password")
  User toEntity(UserDto dto);
}
