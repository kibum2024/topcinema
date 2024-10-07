package com.topcinema.backend.service;

import com.topcinema.backend.model.Movie_still_cuts;
import com.topcinema.backend.model.Movie_still_cutsId;
import com.topcinema.backend.projection.BestMovieProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.MoviesRepository;
import com.topcinema.backend.model.Movies;

import java.util.List;
import java.util.Optional;

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

    public Movies createMovies(Movies movies) {
        return moviesRepository.save(movies);
    }

    public Movies updateMoviesById(int id, Movies movies) {
        Optional<Movies> existingEntity = moviesRepository.findById(id);
        if (existingEntity.isPresent()) {
            movies.setMovie_code(id); // ID 업데이트
            return moviesRepository.save(movies);
        }
        return null;
    }

    public boolean deleteMovies(int id) {
        Optional<Movies> movies = moviesRepository.findById(id);
        if (movies.isPresent()) {
            moviesRepository.delete(movies.get());
            return true;
        }
        return false;
    }
}
