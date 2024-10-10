package com.topcinema.backend.repository;

import com.topcinema.backend.model.Seat_structuresId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Seat_structures;

import java.util.List;

@Repository
public interface Seat_structuresRepository extends JpaRepository<Seat_structures, Seat_structuresId> {
    @Query("SELECT s FROM Seat_structures s WHERE s.cinema_code = :cinemaCode AND s.theater_code = :theaterCode")
    List<Seat_structures> findAllByCinemaCodeAndTheaterCode(@Param("cinemaCode") int cinemaCode, @Param("theaterCode") int theaterCode);
}
