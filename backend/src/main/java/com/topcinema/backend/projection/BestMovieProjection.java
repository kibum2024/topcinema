package com.topcinema.backend.projection;

public interface BestMovieProjection {
    int getRanking();
    String getMovieName();
    String getAgeRestriction();
    String getAgeRestrictionName();
    String getMovieImageName();
    String getScreeningStatus();
    String getMovieCode();
    Double getRating();
    String getReservationRate();
    String getDateTime();
}
