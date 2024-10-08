package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.CinemasRepository;
import com.topcinema.backend.model.Cinemas;

import java.util.List;
import java.util.Optional;

@Service
public class CinemasService {

    @Autowired
    private CinemasRepository cinemasRepository;

    public List<Cinemas> getAllCinemas() {
        return cinemasRepository.findAll();
    }

    public Cinemas getCinemasById(int id) {
        return cinemasRepository.findById(id).orElse(null);
    }

    public Cinemas createCinemas(Cinemas cinemas) {
        return cinemasRepository.save(cinemas);
    }

    public Cinemas updateCinemasById(int id, Cinemas cinemas) {
        Optional<Cinemas> existingEntity = cinemasRepository.findById(id);
        if (existingEntity.isPresent()) {
            cinemas.setTheater_code(id); // 정확한 컬럼명으로 설정
            return cinemasRepository.save(cinemas);
        }
        return null;
    }

    public boolean deleteCinemas(int id) {
        Optional<Cinemas> cinemas = cinemasRepository.findById(id);
        if (cinemas.isPresent()) {
            cinemasRepository.delete(cinemas.get());
            return true;
        }
        return false;
    }
}
