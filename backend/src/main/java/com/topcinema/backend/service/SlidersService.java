package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.SlidersRepository;
import com.topcinema.backend.model.Sliders;

import java.util.List;

@Service
public class SlidersService {

    @Autowired
    private SlidersRepository slidersRepository;

    public List<Sliders> getAllSliders() {
        return slidersRepository.findAll();
    }

    public Sliders getSlidersById(int id) {
        return slidersRepository.findById(id).orElse(null);
    }
}
