package com.topcinema.backend.controller;

import com.topcinema.backend.model.Movie;
import com.topcinema.backend.repository.MovieRepository;
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
    private final MovieRepository movieRepository;

    public FileUploadController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // application.properties에서 설정된 파일 업로드 경로를 가져옴
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title) {

        if (file.isEmpty()) {
            return new ResponseEntity<>("파일이 전송되지 않았습니다.", HttpStatus.BAD_REQUEST);
        }

        // 원본 파일의 확장자 추출
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            return new ResponseEntity<>("파일 이름이 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

//        // 파일 확장자 추출
//        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
//
//        // 허용된 파일 확장자 체크
//        if (!(fileExtension.equals(".jpg") || fileExtension.equals(".jpeg") || fileExtension.equals(".png"))) {
//            return new ResponseEntity<>("허용되지 않는 파일 형식입니다. JPG, JPEG, PNG만 가능합니다.", HttpStatus.BAD_REQUEST);
//        }

        // 고유한 파일명 생성 (UUID 기반)
//        String fileName = UUID.randomUUID().toString() + fileExtension;

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

            // 영화 정보 데이터베이스에 파일명만 저장 (절대 경로가 아닌 파일명)
            Movie movie = new Movie();
            movie.setTitle(title);
            movie.setImagePath(fileName);  // 파일명만 저장
            movieRepository.save(movie);

            return new ResponseEntity<>("영화 정보와 파일 업로드 성공: " + fileName, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("파일 업로드 실패: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("데이터베이스 저장 실패: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
