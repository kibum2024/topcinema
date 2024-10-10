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
    private Integer theater_code;

    @Column(name = "theater_name", length = 100)
    private String theater_name;

    @Column(name = "cinema_code")
    private Integer cinema_code;

    @Column(name = "theater_type", length = 2)
    private String theater_type;

    @Column(name = "user_code")
    private Integer user_code;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updated_at;
}
