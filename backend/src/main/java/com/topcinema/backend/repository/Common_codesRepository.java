package com.topcinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Common_codes;

@Repository
public interface Common_codesRepository extends JpaRepository<Common_codes, Integer> {
}
