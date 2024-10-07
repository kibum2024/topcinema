package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.Movie_still_cutsService;
import com.topcinema.backend.model.Movie_still_cuts;
import com.topcinema.backend.model.Movie_still_cutsId;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Movie_still_cutsController {

    @Autowired
    private Movie_still_cutsService movie_still_cutsService;

    // 전체 조회
    @GetMapping("/movie_still_cuts")
    public List<Movie_still_cuts> getAllMovie_still_cuts() {
        return movie_still_cutsService.getAllMovie_still_cuts();
    }

    // ID로 조회
    @GetMapping("/movie_still_cuts/{id}")
    public Movie_still_cuts getMovie_still_cutsById(@PathVariable Movie_still_cutsId id) {
        return movie_still_cutsService.getMovie_still_cutsById(id);
    }

    // Movie_still_cuts 추가
    @PostMapping("/movie_still_cuts")
    public Movie_still_cuts createMovie_still_cuts(@RequestBody Movie_still_cuts movieStillCuts) {
        return movie_still_cutsService.createMovie_still_cuts(movieStillCuts);
    }

    // Movie_still_cuts 업데이트
    @PutMapping("/movie_still_cuts/{id}")
    public Movie_still_cuts updateMovie_still_cuts(@PathVariable Movie_still_cutsId id,
                                                   @RequestBody Movie_still_cuts updatedMovieStillCuts) {
        return movie_still_cutsService.updateMovie_still_cuts(id, updatedMovieStillCuts);
    }
}
