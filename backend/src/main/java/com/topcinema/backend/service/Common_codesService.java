package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.Common_codesRepository;
import com.topcinema.backend.model.Common_codes;

import java.util.List;

@Service
public class Common_codesService {

    @Autowired
    private Common_codesRepository common_codesRepository;

    public List<Common_codes> getAllCommon_codes() {
        return common_codesRepository.findAll();
    }

    public Common_codes getCommon_codesById(int id) {
        return common_codesRepository.findById(id).orElse(null);
    }
}
