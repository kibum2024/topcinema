package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(name = "seat_structures")
@IdClass(Seat_structuresId.class)
public class Seat_structures {

    @Column(name = "cinema_code")
    @Id
    private Integer cinema_code;

    @Column(name = "theater_code")
    @Id
    private Integer theater_code;

    @Column(name = "seat_row", length = 2)
    @Id
    private String seat_row;

    @Column(name = "seat_col", length = 2)
    @Id
    private String seat_col;

    @Column(name = "seat_type", length = 10)
    private String seat_type;

}
