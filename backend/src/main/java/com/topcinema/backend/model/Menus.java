package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "menus")
public class Menus {

    @Id
    @Column(name = "menu_code")
    private Integer menu_code;

    @Column(name = "menu_kind", length = 1)
    private String menu_kind;

    @Column(name = "menu_main", length = 2)
    private String menu_main;

    @Column(name = "menu_sub", length = 2)
    private String menu_sub;

    @Column(name = "menu_small", length = 2)
    private String menu_small;

    @Column(name = "menu_name", length = 100)
    private String menu_name;

    @Column(name = "menu_type", length = 1)
    private String menu_type;

    @Column(name = "menu_url", length = 100)
    private String menu_url;

    @Column(name = "menu_icon", length = 100)
    private String menu_icon;

    @Column(name = "menu_component", length = 100)
    private String menu_component;

}
