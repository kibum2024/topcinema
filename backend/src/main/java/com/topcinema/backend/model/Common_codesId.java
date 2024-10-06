package com.topcinema.backend.model;

import java.io.Serializable;
import java.util.Objects;

public class Common_codesId implements Serializable {

    private String common_kind_code;

    private String common_code;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Common_codesId that = (Common_codesId) o;
        return Objects.equals(common_kind_code, that.common_kind_code) && Objects.equals(common_code, that.common_code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(common_kind_code, common_code);
    }
}
