package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.TheatersRepository;
import com.topcinema.backend.model.Theaters;

import java.util.List;
import java.util.Optional;

@Service
public class TheatersService {

    @Autowired
    private TheatersRepository theatersRepository;

    public List<Theaters> getAllTheaters() {
        return theatersRepository.findAll();
    }

    public Theaters getTheatersById(int id) {
        return theatersRepository.findById(id).orElse(null);
    }

    public Theaters createTheaters(Theaters theaters) {
        return theatersRepository.save(theaters);
    }

    public Theaters updateTheatersById(int id, Theaters theaters) {
        Optional<Theaters> existingEntity = theatersRepository.findById(id);
        if (existingEntity.isPresent()) {
            theaters.setTheater_code(id);
            return theatersRepository.save(theaters);
        }
        return null;
    }
    public boolean deleteTheaters(int id) {
        Optional<Theaters> theaters = theatersRepository.findById(id);
        if (theaters.isPresent()) {
            theatersRepository.delete(theaters.get());
            return true;
        }
        return false;
    }
}
