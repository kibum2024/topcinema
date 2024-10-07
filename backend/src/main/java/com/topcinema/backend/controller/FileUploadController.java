package com.topcinema.backend.controller;

import com.topcinema.backend.model.Movies;
import com.topcinema.backend.repository.MoviesRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    // 영화 정보 저장하는 JPA Repository
    private final MoviesRepository moviesRepository;

    public FileUploadController(MoviesRepository moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    // application.properties에서 설정된 파일 업로드 경로를 가져옴
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("movie_name") String movieName,
            @RequestParam("screening_time") String screeningTime,
            @RequestParam("age_restriction") char ageRestriction,
            @RequestParam("view_count") Integer viewCount,
            @RequestParam("screening_start_date") String screeningStartDate,
            @RequestParam("screening_end_date") String screeningEndDate,
            @RequestParam("movie_story") String movieStory,
            @RequestParam("movie_genre") String movieGenre,
            @RequestParam("nationality") String nationality,
            @RequestParam("director") String director
    ) {

        if (file.isEmpty()) {
            return new ResponseEntity<>("파일이 전송되지 않았습니다.", HttpStatus.BAD_REQUEST);
        }

        // 원본 파일의 확장자 추출
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            return new ResponseEntity<>("파일 이름이 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        // 파일명 중복 방지를 위한 타임스탬프 추가
        String fileName = System.currentTimeMillis() + "_" + originalFilename;

        // 파일 저장 경로 설정 및 디렉토리 존재 여부 확인
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // 디렉토리가 없으면 생성
        }

        File uploadPath = Paths.get(uploadDir, fileName).toFile(); // 운영체제에 따른 경로 구분자 처리

        try {
            // 파일 저장
            file.transferTo(uploadPath);

            // 영화 정보 데이터베이스에 저장 (절대 경로가 아닌 파일명만 저장)
            Movies movie = new Movies();
            movie.setMovie_name(movieName);  // setMovieName -> setMovie_name으로 수정
            movie.setScreening_time(screeningTime);  // 필드 이름에 맞춘 setter 사용
//            movie.setAge_restriction(ageRestriction);
            movie.setView_count(viewCount);
            movie.setScreening_start_date(screeningStartDate);
            movie.setScreening_end_date(screeningEndDate);
            movie.setMovie_story(movieStory);
            movie.setMovie_genre(movieGenre);
            movie.setNationality(nationality);
            movie.setDirector(director);
            movie.setMovie_image_name(fileName); // 파일명만 저장
            movie.setRegistration_date(screeningStartDate); // 등록일자를 상영 시작일로 설정
            moviesRepository.save(movie);

            return new ResponseEntity<>("영화 정보와 파일 업로드 성공: " + fileName, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("파일 업로드 실패: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("데이터베이스 저장 실패: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
