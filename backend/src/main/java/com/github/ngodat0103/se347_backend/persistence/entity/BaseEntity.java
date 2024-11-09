package com.github.ngodat0103.se347_backend.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.Instant;


@MappedSuperclass
@Getter
@NoArgsConstructor
@Setter
public abstract  class BaseEntity {
    @CreatedDate
    @Column(name = "created_date")
    private Instant createdDate;
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;
}
