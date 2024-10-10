package com.topcinema.backend.controller;

import com.topcinema.backend.dto.SeatStructureDTO;
import com.topcinema.backend.model.Seat_structuresId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.Seat_structuresService;
import com.topcinema.backend.model.Seat_structures;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class Seat_structuresController {

    @Autowired
    private Seat_structuresService seat_structuresService;

    // 전체 조회
    @GetMapping("/seat_structures")
    public List<Seat_structures> getAllSeat_structures() {
        return seat_structuresService.getAllSeat_structures();
    }

    // ID로 조회
    @GetMapping("/seat_structures/{id}")
    public Seat_structures getSeat_structuresById(@PathVariable Seat_structuresId id) {
        return seat_structuresService.getSeat_structuresById(id);
    }

    @GetMapping("/seat_structures_all")
    public ResponseEntity<List<Map<String, Object>>> getSeats(@RequestParam int cinemaCode, @RequestParam int theaterCode) {
        List<Map<String, Object>> seatStructures = seat_structuresService.getSeatStructures(cinemaCode, theaterCode);
        return ResponseEntity.ok(seatStructures);
    }

    // 생성
    @PostMapping("/createseat_structures")
    public Seat_structures createSeat_structures(@RequestBody Seat_structures seat_structures) {
        return seat_structuresService.createSeat_structures(seat_structures);
    }

    @PostMapping("/create_all_seat_structures")
    public ResponseEntity<String> saveSeats(@RequestBody SeatStructureDTO seatData) {
        int cinemaCode = seatData.getCinemaCode();
        int theaterCode = seatData.getTheaterCode();

        List<Seat_structures> seatStructures = seatData.getRows().stream().flatMap(row ->
                row.getSeats().stream().map(seat -> {
                    Seat_structures seatStructure = new Seat_structures();
                    seatStructure.setCinema_code(cinemaCode);  // cinema_code 값을 DTO에서 가져옴
                    seatStructure.setTheater_code(theaterCode);  // theater_code 값을 DTO에서 가져옴
                    seatStructure.setSeat_row(row.getSeatRow());  // seat_row 값을 행에서 가져옴
                    seatStructure.setSeat_col(seat.getSeatCol());  // seat_col 값을 좌석에서 가져옴
                    seatStructure.setSeat_type(seat.getSeatType());  // seat_type 값을 좌석에서 가져옴
                    return seatStructure;
                })
        ).collect(Collectors.toList());

        // 서비스 호출하여 데이터 저장
        seat_structuresService.saveAll(seatStructures);

        return ResponseEntity.ok("Seats saved successfully");
    }
    // ID로 수정
    @PutMapping("/updateseat_structures/{id}")
    public Seat_structures updateSeat_structuresById(@PathVariable Seat_structuresId id, @RequestBody Seat_structures seat_structures) {
        return seat_structuresService.updateSeat_structuresById(id, seat_structures);
    }

    // 삭제
    @DeleteMapping("/deleteseat_structures/{id}")
    public boolean deleteSeat_structures(@PathVariable Seat_structuresId id) {
        return seat_structuresService.deleteSeat_structures(id);
    }
}
