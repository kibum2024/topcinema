package com.topcinema.backend.service;

import com.topcinema.backend.model.Movie_still_cuts;
import com.topcinema.backend.model.Movie_still_cutsId;
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

    public Movies createMovies(Movies createdMovie) {
        return moviesRepository.save(createdMovie);
    }

    public Movies updateMovies(int id, Movies updatedMovie) {
        return moviesRepository.findById(id).map(movie -> {
            // 영화 필드를 업데이트
            movie.setMovie_name(updatedMovie.getMovie_name());
            movie.setScreening_time(updatedMovie.getScreening_time());
            movie.setAge_restriction(updatedMovie.getAge_restriction());
            movie.setMovie_type(updatedMovie.getMovie_type());
            movie.setView_count(updatedMovie.getView_count());
            movie.setScreening_start_date(updatedMovie.getScreening_start_date());
            movie.setScreening_end_date(updatedMovie.getScreening_end_date());
            movie.setInterest_count(updatedMovie.getInterest_count());
            movie.setMovie_story(updatedMovie.getMovie_story());
            movie.setMovie_genre(updatedMovie.getMovie_genre());
            movie.setNationality(updatedMovie.getNationality());
            movie.setDirector(updatedMovie.getDirector());
            movie.setMovie_image_name(updatedMovie.getMovie_image_name());
            movie.setRegistration_date(updatedMovie.getRegistration_date());
            movie.setUser_code(updatedMovie.getUser_code());

            // 저장 후 업데이트된 영화 반환
            return moviesRepository.save(movie);
        }).orElse(null); // 영화가 없을 경우 null 반환 또는 예외 처리 가능
    }
}
