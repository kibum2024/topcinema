package com.topcinema.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
public class Movie_still_cutsId implements Serializable {

    private Integer movie_code;

    private Integer still_cut_code;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie_still_cutsId that = (Movie_still_cutsId) o;
        return Objects.equals(movie_code, that.movie_code) && Objects.equals(still_cut_code, that.still_cut_code); 
    }

    @Override
    public int hashCode() {
        return Objects.hash(movie_code, still_cut_code);
    }
}
