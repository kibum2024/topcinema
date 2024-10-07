package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.Movie_still_cutsRepository;
import com.topcinema.backend.model.Movie_still_cuts;
import com.topcinema.backend.model.Movie_still_cutsId;

import java.util.List;

@Service
public class Movie_still_cutsService {

    @Autowired
    private Movie_still_cutsRepository movie_still_cutsRepository;

    // 전체 조회
    public List<Movie_still_cuts> getAllMovie_still_cuts() {
        return movie_still_cutsRepository.findAll();
    }

    // ID로 조회
    public Movie_still_cuts getMovie_still_cutsById(Movie_still_cutsId id) {
        return movie_still_cutsRepository.findById(id).orElse(null);
    }

    // 새로운 Movie_still_cuts 추가
    public Movie_still_cuts createMovie_still_cuts(Movie_still_cuts movieStillCuts) {
        return movie_still_cutsRepository.save(movieStillCuts);
    }

    // Movie_still_cuts 업데이트
    public Movie_still_cuts updateMovie_still_cuts(Movie_still_cutsId id, Movie_still_cuts updatedMovieStillCuts) {
        if (movie_still_cutsRepository.existsById(id)) {
            updatedMovieStillCuts.setMovie_code(id.getMovie_code());
            updatedMovieStillCuts.setStill_cut_code(id.getStill_cut_code());
            return movie_still_cutsRepository.save(updatedMovieStillCuts);
        }
        return null; // 또는 예외를 던질 수 있음
    }
}
