package com.topcinema.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
//@AllArgsConstructor
public class BestMovieDTO {
    private int ranking;

    @JsonProperty("movie_name")
    private String movieName;

    @JsonProperty("age_restriction")
    private String ageRestriction;

    @JsonProperty("movie_image_name")
    private String movieImageName;

    @JsonProperty("screening_status")
    private String screeningStatus;

    @JsonProperty("movie_code")
    private String movieCode;

    private double rating;

    @JsonProperty("reservation_rate")
    private String reservationRate;

    // 생성자 추가
    public BestMovieDTO(int ranking, String movieName, String ageRestriction, String movieImageName,
                        String screeningStatus, String movieCode, double rating, String reservationRate) {
        this.ranking = ranking;
        this.movieName = movieName;
        this.ageRestriction = ageRestriction;
        this.movieImageName = movieImageName;
        this.screeningStatus = screeningStatus;
        this.movieCode = movieCode;
        this.rating = rating;
        this.reservationRate = reservationRate;
    }
}
