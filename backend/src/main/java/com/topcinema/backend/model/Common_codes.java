package com.topcinema.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "common_codes")
@IdClass(Common_codesId.class)
public class Common_codes {

    @Column(name = "common_kind_code", length = 20)
    @Id
    private String common_kind_code;

    @Column(name = "common_code", length = 2)
    @Id
    private String common_code;

    @Column(name = "common_name", length = 200)
    private String common_name;

}
