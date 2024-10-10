package com.topcinema.backend.service;

import com.topcinema.backend.model.Seat_structuresId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.Seat_structuresRepository;
import com.topcinema.backend.model.Seat_structures;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class Seat_structuresService {

    @Autowired
    private Seat_structuresRepository seat_structuresRepository;

    public List<Seat_structures> getAllSeat_structures() {
        return seat_structuresRepository.findAll();
    }

    public Seat_structures getSeat_structuresById(Seat_structuresId id) {
        return seat_structuresRepository.findById(id).orElse(null);
    }

    public List<Map<String, Object>> getSeatStructures(int cinemaCode, int theaterCode) {
        List<Seat_structures> seatStructures = seat_structuresRepository.findAllByCinemaCodeAndTheaterCode(cinemaCode, theaterCode);

        // 데이터를 행(row)과 좌석(seat)으로 그룹화하여 반환
        Map<String, List<Seat_structures>> groupedByRow = seatStructures.stream()
                .collect(Collectors.groupingBy(Seat_structures::getSeat_row));

        // JSON 형태로 변환하여 반환
        return groupedByRow.entrySet().stream().map(entry -> Map.of(
                "seat_row", entry.getKey(),
                "seats", entry.getValue().stream().map(seat -> Map.of(
                        "seat_col", seat.getSeat_col(),
                        "seat_type", seat.getSeat_type()
                )).collect(Collectors.toList())
        )).collect(Collectors.toList());
    }

    public Seat_structures createSeat_structures(Seat_structures seat_structures) {
        return seat_structuresRepository.save(seat_structures);
    }

    public void saveAll(List<Seat_structures> seatStructures) {
        seat_structuresRepository.saveAll(seatStructures);  // 여러 좌석을 한 번에 저장
    }

    public Seat_structures updateSeat_structuresById(Seat_structuresId id, Seat_structures updatedSeat_structures) {
        if (seat_structuresRepository.existsById(id)) {
            updatedSeat_structures.setCinema_code(id.getCinema_code());
            updatedSeat_structures.setTheater_code(id.getTheater_code());
            updatedSeat_structures.setSeat_row(id.getSeat_row());
            updatedSeat_structures.setSeat_col(id.getSeat_col());
            return seat_structuresRepository.save(updatedSeat_structures);
        }
        return null;
    }
    public boolean deleteSeat_structures(Seat_structuresId id) {
        Optional<Seat_structures> seat_structures = seat_structuresRepository.findById(id);
        if (seat_structures.isPresent()) {
            seat_structuresRepository.delete(seat_structures.get());
            return true;
        }
        return false;
    }
}
