package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.TheatersService;
import com.topcinema.backend.model.Theaters;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TheatersController {

    @Autowired
    private TheatersService theatersService;

    // 전체 조회
    @GetMapping("/theaters")
    public List<Theaters> getAllTheaters() {
        return theatersService.getAllTheaters();
    }

    // ID로 조회
    @GetMapping("/theaters/{id}")
    public Theaters getTheatersById(@PathVariable int id) {
        return theatersService.getTheatersById(id);
    }

    // 생성
    @PostMapping("/createtheaters")
    public Theaters createTheaters(@RequestBody Theaters theaters) {
        return theatersService.createTheaters(theaters);
    }

    // ID로 수정
    @PutMapping("/updatetheaters/{id}")
    public Theaters updateTheatersById(@PathVariable int id, @RequestBody Theaters theaters) {
        return theatersService.updateTheatersById(id, theaters);
    }

    // 삭제
    @DeleteMapping("/deletetheaters/{id}")
    public boolean deleteTheaters(@PathVariable int id) {
        return theatersService.deleteTheaters(id);
    }
}
