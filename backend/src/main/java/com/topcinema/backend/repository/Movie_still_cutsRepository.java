package com.topcinema.backend.repository;

import com.topcinema.backend.model.Movie_still_cutsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Movie_still_cuts;

@Repository
public interface Movie_still_cutsRepository extends JpaRepository<Movie_still_cuts, Movie_still_cutsId> {
}
