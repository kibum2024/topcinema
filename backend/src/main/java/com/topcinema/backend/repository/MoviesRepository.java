package com.topcinema.backend.repository;

import com.topcinema.backend.projection.BestMovieProjection;
import com.topcinema.backend.model.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movies, Integer> {

        @Query(value = "SELECT " +
                "ROW_NUMBER() OVER(ORDER BY a.age_restriction) AS ranking, " +
                "a.movie_name AS movieName, " +
                "a.age_restriction as ageRestriction, " +
                "c.common_name as ageRestrictionName, " +
                "a.movie_image_name AS movieImageName, " +
                "CASE " +
                "    WHEN DATEDIFF(a.screening_start_date, CURDATE()) > 0 " +
                "        THEN CONCAT('D-', DATEDIFF(a.screening_start_date, CURDATE())) " +
                "    ELSE 'play' " +
                "END AS screeningStatus, " +
                "a.movie_code AS movieCode, " +
                "AVG(b.rating) AS rating, " +
                "'15.2%' AS reservationRate, " +
                "sysdate() as dateTime " +
                "FROM movies a " +
                "LEFT JOIN movie_reviews b ON a.movie_code = b.movie_code " +
                "LEFT JOIN " +
                "    common_codes c ON c.common_kind_code = \"age_restriction\"\n" +
                "                  and a.age_restriction = c.common_code " +
                "WHERE a.screening_end_date >= DATE_FORMAT(SYSDATE(), '%Y%m%d') " +
                "GROUP BY a.movie_code LIMIT 20 ", nativeQuery = true)
        List<BestMovieProjection> findBestMovies();
}
