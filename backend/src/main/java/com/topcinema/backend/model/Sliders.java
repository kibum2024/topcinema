package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "sliders")
public class Sliders {

    @Id
    @Column(name = "slider_code")
    private Integer slider_code;

    @Column(name = "slider_name", length = 100)
    private String slider_name;

    @Column(name = "slider_position", length = 1)
    private char slider_position;

    @Column(name = "slider_image_name", length = 200)
    private String slider_image_name;

    @Column(name = "slider_enable", length = 1)
    private char slider_enable;

    @Column(name = "slider_url", length = 200)
    private String slider_url;

}
