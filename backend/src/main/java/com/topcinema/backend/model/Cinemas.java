package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cinemas")
public class Cinemas {

    @Column(name = "theater_code")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer theater_code;

    @Column(name = "theater_name", length = 100)
    private String theater_name;

    @Column(name = "road_code", length = 5)
    private String road_code;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "detail_address", length = 100)
    private String detail_address;

    @Column(name = "public_transport_info", length = 2000)
    private String public_transport_info;

    @Column(name = "parking_info", length = 2000)
    private String parking_info;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "region_code")
    private Integer region_code;

}
