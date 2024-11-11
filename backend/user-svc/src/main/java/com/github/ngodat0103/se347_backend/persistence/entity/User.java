package com.github.ngodat0103.se347_backend.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cwd_user", schema = "public")
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, precision = 18)
  private Long id;

  @Column(name = "directory_id", precision = 18)
  private Long directoryId;

  @Column(name = "user_name", unique = true)
  private String userName;

  @Column(name = "lower_user_name", unique = true)
  private String lowerUserName;

  @Column(name = "active", precision = 9)
  private Integer active;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "lower_first_name")
  private String lowerFirstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "lower_last_name")
  private String lowerLastName;

  @Column(name = "display_name")
  private String displayName;

  @Column(name = "lower_display_name")
  private String lowerDisplayName;

  @Column(name = "email_address", unique = true)
  private String emailAddress;

  @Column(name = "lower_email_address")
  private String lowerEmailAddress;

  @Column(name = "credential")
  private String credential;

  @Column(name = "deleted_externally", precision = 9)
  private Integer deletedExternally;

  @Column(name = "external_id")
  private String externalId;
}
