package com.topcinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.topcinema.backend.repository.MenusRepository;
import com.topcinema.backend.model.Menus;

import java.util.List;

@Service
public class MenusService {

    @Autowired
    private MenusRepository menusRepository;

    public List<Menus> getAllMenus() {
        return menusRepository.findAll();
    }

    public List<Menus> getUserTypeMenus(String menuType) {
        return menusRepository.findUserTypeMenus(menuType);
    }

    public Menus getMenusById(int id) {
        return menusRepository.findById(id).orElse(null);
    }
}
