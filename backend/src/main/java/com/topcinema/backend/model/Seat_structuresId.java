package com.topcinema.backend.model;

import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

@Getter
public class Seat_structuresId implements Serializable {

    private Integer cinema_code;

    private Integer theater_code;

    private String seat_row;

    private String seat_col;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seat_structuresId that = (Seat_structuresId) o;
        return Objects.equals(cinema_code, that.cinema_code) && Objects.equals(theater_code, that.theater_code) && Objects.equals(seat_row, that.seat_row) && Objects.equals(seat_col, that.seat_col); 
    }

    @Override
    public int hashCode() {
        return Objects.hash(cinema_code, theater_code, seat_row, seat_col);
    }
}
