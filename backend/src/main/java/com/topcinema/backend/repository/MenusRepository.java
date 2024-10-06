package com.topcinema.backend.repository;

import com.topcinema.backend.projection.BestMovieProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.topcinema.backend.model.Menus;

import java.util.List;

@Repository
public interface MenusRepository extends JpaRepository<Menus, Integer> {

    @Query(value = "SELECT * " +
            "from menus " +
            "where menu_type = :menuType " +
            "order by menu_main, menu_sub, menu_small  ", nativeQuery = true)
    List<Menus> findUserTypeMenus(String menuType);
}
