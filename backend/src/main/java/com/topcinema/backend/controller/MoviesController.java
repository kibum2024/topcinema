package com.topcinema.backend.controller;

import com.topcinema.backend.model.Movies;
import com.topcinema.backend.projection.BestMovieProjection;
import com.topcinema.backend.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MoviesController {

    @Autowired
    private MoviesService moviesService;

    @GetMapping("/movies")
    public List<Movies> getAllMovies() {
        return moviesService.getAllMovies();
    }

    @GetMapping("/movies/{id}")
    public Movies getMoviesById(@PathVariable int id) {
        return moviesService.getMoviesById(id);
    }

    @GetMapping("/bestmovies")
    public List<BestMovieProjection> getBestMovies() {
        return moviesService.getBestMovies();
    }

    @PostMapping("/createmovies")
    public Movies createMovies(@RequestBody Movies createdMovie) {
        return moviesService.createMovies(createdMovie);
    }

    @PutMapping("/updatemovies/{id}")
    public Movies updateMovies(@PathVariable int id, @RequestBody Movies updatedMovie) {
        return moviesService.updateMovies(id, updatedMovie);
    }
}
