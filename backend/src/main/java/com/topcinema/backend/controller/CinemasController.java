package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.CinemasService;
import com.topcinema.backend.model.Cinemas;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CinemasController {

    @Autowired
    private CinemasService cinemasService;

    // 전체 조회
    @GetMapping("/cinemas")
    public List<Cinemas> getAllCinemas() {
        return cinemasService.getAllCinemas();
    }

    // ID로 조회
    @GetMapping("/cinemas/{id}")
    public Cinemas getCinemasById(@PathVariable int id) {
        return cinemasService.getCinemasById(id);
    }

    // 생성
    @PostMapping("/createcinemas")
    public Cinemas createCinemas(@RequestBody Cinemas cinemas) {
        return cinemasService.createCinemas(cinemas);
    }

    // ID로 수정
    @PutMapping("/updatecinemas/{id}")
    public Cinemas updateCinemasById(@PathVariable int id, @RequestBody Cinemas cinemas) {
        return cinemasService.updateCinemasById(id, cinemas);
    }

    // 삭제
    @DeleteMapping("/deletecinemas/{id}")
    public boolean deleteCinemas(@PathVariable int id) {
        return cinemasService.deleteCinemas(id);
    }
}
