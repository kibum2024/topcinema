package com.topcinema.backend.controller;

import com.topcinema.backend.model.Movies;
import com.topcinema.backend.projection.BestMovieProjection;
import com.topcinema.backend.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    // 생성
//    @PostMapping("/createmovies")
//    public Movies createMovies(@RequestBody Movies movies) {
//        return moviesService.createMovies(movies);
//    }
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/createmovies")
    public Movies createMovies(
            @RequestParam("movie_name") String movieName,
            @RequestParam("movie_type") String  movieType,
            @RequestParam("screening_time") String screeningTime,
            @RequestParam("age_restriction") String ageRestriction,
            @RequestParam(value = "view_count", defaultValue = "0") Integer viewCount,
            @RequestParam("screening_start_date") String screeningStartDate,
            @RequestParam("screening_end_date") String screeningEndDate,
            @RequestParam(value = "interest_count", defaultValue = "0") Integer interestCount,
            @RequestParam("movie_story") String movieStory,
            @RequestParam("movie_genre") String movieGenre,
            @RequestParam("nationality") String nationality,
            @RequestParam("director") String director,
            @RequestParam(value = "movie_image_name", required = false) MultipartFile movieImageName, // 파일 처리
            @RequestParam("registration_date") String registrationDate,
            @RequestParam(value = "user_code", defaultValue = "0") Integer userCode
    ) {
        // 영화 정보를 Movies 엔티티에 설정
        Movies movie = new Movies();
        movie.setMovie_name(movieName);
        movie.setMovie_type(movieType);
        movie.setScreening_time(screeningTime);
        movie.setAge_restriction(ageRestriction);
        movie.setView_count(viewCount);
        movie.setScreening_start_date(screeningStartDate);
        movie.setScreening_end_date(screeningEndDate);
        movie.setInterest_count(interestCount);
        movie.setMovie_story(movieStory);
        movie.setMovie_genre(movieGenre);
        movie.setNationality(nationality);
        movie.setDirector(director);
        movie.setRegistration_date(registrationDate);
        movie.setUser_code(userCode);

        // 파일 업로드 처리
        if (movieImageName != null && !movieImageName.isEmpty()) {
            String movieImagePath = saveMovieImage(movieImageName);
            movie.setMovie_image_name(movieImagePath); // 이미지 경로를 Movies 객체에 저장
        }

        return moviesService.createMovies(movie);
    }

    // 영화 이미지를 저장하는 메서드
    private String saveMovieImage(MultipartFile movieImage) {
        // 파일명을 클린업 (파일명을 클라이언트로부터 받아올 때 원본 파일명을 처리)
        String fileName = StringUtils.cleanPath(movieImage.getOriginalFilename());

        // 이미지 파일 저장 경로: /home/ubuntu/topcinema/images/movie
        Path movieImagePath = Paths.get(uploadDir + fileName);

        // 경로와 파일명을 로그로 출력하여 확인
        System.out.println("Saving file to: " + movieImagePath.toString());

        try {
            // 경로가 존재하지 않으면 생성
            Files.createDirectories(movieImagePath.getParent());

            // 이미지 파일을 지정된 경로에 저장
            Files.copy(movieImage.getInputStream(), movieImagePath, StandardCopyOption.REPLACE_EXISTING);

            // 저장된 이미지 경로를 리턴
            return fileName;
        } catch (IOException e) {
            // 파일 업로드 중 에러 처리
            throw new RuntimeException("이미지 저장 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // ID로 수정
    @PutMapping("/updatemovies/{id}")
    public Movies updateMoviesById(@PathVariable int id, @RequestBody Movies movies) {
        return moviesService.updateMoviesById(id, movies);
    }

    // 삭제
    @DeleteMapping("/deletemovies/{id}")
    public boolean deleteMovies(@PathVariable int id) {
        return moviesService.deleteMovies(id);
    }
}
