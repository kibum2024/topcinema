package com.topcinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Theaters;

@Repository
public interface TheatersRepository extends JpaRepository<Theaters, Integer> {
}
