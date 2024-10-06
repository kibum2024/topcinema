package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.BannersService;
import com.topcinema.backend.model.Banners;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
public class BannersController {

    @Autowired
    private BannersService bannersService;

    @GetMapping
    public List<Banners> getAllBanners() {
        return bannersService.getAllBanners();
    }

    @GetMapping("/{position}")
    public Banners getBannersById(@PathVariable String position) {
        return bannersService.getBannersByPosition(position);
    }
}
