package com.topcinema.backend.dto;

import java.util.List;

public class SeatStructureDTO {
    private int cinemaCode;
    private int theaterCode;
    private List<RowDTO> rows;

    // Getters and Setters

    public int getCinemaCode() {
        return cinemaCode;
    }

    public void setCinemaCode(int cinemaCode) {
        this.cinemaCode = cinemaCode;
    }

    public int getTheaterCode() {
        return theaterCode;
    }

    public void setTheaterCode(int theaterCode) {
        this.theaterCode = theaterCode;
    }

    public List<RowDTO> getRows() {
        return rows;
    }

    public void setRows(List<RowDTO> rows) {
        this.rows = rows;
    }
}
