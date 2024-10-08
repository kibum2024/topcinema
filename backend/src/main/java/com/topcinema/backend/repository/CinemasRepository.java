package com.topcinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Cinemas;

@Repository
public interface CinemasRepository extends JpaRepository<Cinemas, Integer> {
}
