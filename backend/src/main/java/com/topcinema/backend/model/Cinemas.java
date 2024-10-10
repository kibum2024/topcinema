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
@Table(name = "cinemas")
public class Cinemas {

    @Column(name = "cinema_code")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinema_code;

    @Column(name = "cinema_name", length = 100)
    private String cinema_name;

    @Column(name = "post_code", length = 5)
    private String post_code;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "detail_address", length = 200)
    private String detail_address;

    @Column(name = "public_transport_info", length = 2000)
    private String public_transport_info;

    @Column(name = "parking_info", length = 2000)
    private String parking_info;

    @Column(name = "longitude", length = 10)
    private String longitude;

    @Column(name = "latitude", length = 10)
    private String latitude;

    @Column(name = "region_code")
    private Integer region_code;

    @Column(name = "user_code")
    private Integer user_code;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updated_at;

}
