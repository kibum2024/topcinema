package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.BannersRepository;
import com.topcinema.backend.model.Banners;

import java.util.List;

@Service
public class BannersService {

    @Autowired
    private BannersRepository bannersRepository;

    public List<Banners> getAllBanners() {
        return bannersRepository.findAll();
    }

    public Banners getBannersByPosition(String position) {
        return bannersRepository.findByPosition(position).orElse(null);
    }
}
