package com.topcinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Banners;

import java.util.Optional;

@Repository
public interface BannersRepository extends JpaRepository<Banners, Integer> {
    // position 필드로 배너를 무작위로 하나 조회하는 메서드
    @Query(value = "SELECT * FROM banners WHERE banner_position = :position ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<Banners> findByPosition(@Param("position") String position);

}
