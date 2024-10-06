package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.Common_codesService;
import com.topcinema.backend.model.Common_codes;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Common_codesController {

    @Autowired
    private Common_codesService common_codesService;

    @GetMapping("/common_codes")
    public List<Common_codes> getAllCommon_codes() {
        return common_codesService.getAllCommon_codes();
    }

    @GetMapping("/common_codes/{id}")
    public Common_codes getCommon_codesById(@PathVariable int id) {
        return common_codesService.getCommon_codesById(id);
    }
}
