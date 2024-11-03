package com.github.ngodat0103.javabackup;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition
public class JavaBackupApplication {

  public static void main(String[] args) {
    SpringApplication.run(JavaBackupApplication.class, args);
  }
}
