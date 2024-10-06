package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.SlidersService;
import com.topcinema.backend.model.Sliders;

import java.util.List;

@RestController
@RequestMapping("/api/sliders")
public class SlidersController {

    @Autowired
    private SlidersService slidersService;

    @GetMapping
    public List<Sliders> getAllSliders() {
        return slidersService.getAllSliders();
    }

    @GetMapping("/{id}")
    public Sliders getSlidersById(@PathVariable int id) {
        return slidersService.getSlidersById(id);
    }
}
