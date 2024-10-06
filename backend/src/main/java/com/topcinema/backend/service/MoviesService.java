package com.topcinema.backend.service;

import com.topcinema.backend.projection.BestMovieProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.MoviesRepository;
import com.topcinema.backend.model.Movies;

import java.util.List;

@Service
public class MoviesService {

    @Autowired
    private MoviesRepository moviesRepository;

    public List<Movies> getAllMovies() {
        return moviesRepository.findAll();
    }

    public Movies getMoviesById(int id) {
        return moviesRepository.findById(id).orElse(null);
    }

    public List<BestMovieProjection> getBestMovies() {
        return moviesRepository.findBestMovies();
    }
}
