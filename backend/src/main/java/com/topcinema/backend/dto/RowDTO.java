package com.topcinema.backend.dto;

import java.util.List;

public class RowDTO {
    private String seatRow;
    private List<SeatDTO> seats;

    // Getters and Setters
    public String getSeatRow() {
        return seatRow;
    }

    public void setSeatRow(String seatRow) {
        this.seatRow = seatRow;
    }

    public List<SeatDTO> getSeats() {
        return seats;
    }

    public void setSeats(List<SeatDTO> seats) {
        this.seats = seats;
    }
}
