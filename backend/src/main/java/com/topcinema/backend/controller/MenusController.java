package com.topcinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.topcinema.backend.service.MenusService;
import com.topcinema.backend.model.Menus;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MenusController {

    @Autowired
    private MenusService menusService;

    @GetMapping("/menus")
    public List<Menus> getAllMenus() {
        return menusService.getAllMenus();
    }

    @GetMapping("/menus/{menuType}")
    public List<Menus> getUserTypeMenus(@PathVariable String menuType) {
        return menusService.getUserTypeMenus(menuType);
    }

    @GetMapping("/{id}")
    public Menus getMenusById(@PathVariable int id) {
        return menusService.getMenusById(id);
    }
}
