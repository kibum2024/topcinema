package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@Table(name = "cinemas")
@EntityListeners(AuditingEntityListener.class)
public class Cinemas {

    @Column(name = "cinema_code")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinemaCode;

    @Column(name = "cinema_name", length = 100)
    private String cinemaName;

    @Column(name = "post_code", length = 5)
    private String postCode;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "detail_address", length = 200)
    private String detailAddress;

    @Column(name = "public_transport_info", length = 2000)
    private String publicTransportInfo;

    @Column(name = "parking_info", length = 2000)
    private String parkingInfo;

    @Column(name = "longitude", length = 10)
    private String longitude;

    @Column(name = "latitude", length = 10)
    private String latitude;

    @Column(name = "region_code")
    private Integer regionCode;

    @Column(name = "user_code")
    private Integer userCode;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
