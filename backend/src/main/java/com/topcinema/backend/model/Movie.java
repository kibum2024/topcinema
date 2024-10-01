package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_code")
    private int movie_code;

    @Column(name = "movie_name", length = 100)
    private String movie_name;  // JSON과 DB에서 모두 movie_name 사용

    @Column(name = "screening_time", length = 4)
    private String screening_time;

    @Column(name = "age_restriction", length = 20)
    private String age_restriction;

    @Column(name = "view_count")
    private Integer view_count;

    @Column(name = "screening_start_date", length = 8)
    private String screening_start_date;

    @Column(name = "screening_end_date", length = 8)
    private String screening_end_date;

    @Column(name = "movie_story", length = 2000)
    private String movie_story;

    @Column(name = "movie_genre", length = 100)
    private String movie_genre;

    @Column(name = "nationality", length = 100)
    private String nationality;

    @Column(name = "director", length = 100)
    private String director;

    @Column(name = "movie_image_name", length = 200)
    private String movie_image_name;

    @Column(name = "registration_date", length = 8)
    private String registration_date;

    @Column(name = "user_code")
    private Integer user_code;

    @Column(name = "image_path", length = 255)
    private String image_path;
}
