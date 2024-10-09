package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
@Table(name = "theaters")
public class Theaters {

    @Column(name = "theater_code")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer theaterCode;

    @Column(name = "theater_name", length = 100)
    private String theaterName;

    @Column(name = "cinema_code")
    private Integer cinemaCode;

    @Column(name = "theater_type", length = 1)
    private String theaterType;

    @Column(name = "user_code")
    private Integer userCode;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}
