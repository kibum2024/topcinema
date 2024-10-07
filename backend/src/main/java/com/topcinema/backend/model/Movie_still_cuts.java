package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "movie_still_cuts")
@IdClass(Movie_still_cutsId.class)
public class Movie_still_cuts {

    @Column(name = "movie_code")
    @Id
    private Integer movie_code;

    @Column(name = "still_cut_code")
    @Id
    private Integer still_cut_code;

    @Column(name = "still_cut_image_name", length = 200)
    private String still_cut_image_name;

}
