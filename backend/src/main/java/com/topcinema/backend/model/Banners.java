package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "banners")
public class Banners {

    @Id
    @Column(name = "banner_code")
    private Integer banner_code;

    @Column(name = "banner_name", length = 100)
    private String banner_name;

    @Column(name = "banner_position", length = 1)
    private char banner_position;

    @Column(name = "banner_image_name", length = 200)
    private String banner_image_name;

    @Column(name = "banner_enable", length = 1)
    private char banner_enable;

    @Column(name = "banner_bg_color", length = 100)
    private String banner_bg_color;

    @Column(name = "banner_url", length = 200)
    private String banner_url;

}
