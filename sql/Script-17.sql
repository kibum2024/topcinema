-- menus 테이블 생성 스크립트
CREATE TABLE menus (
    menu_code int,
    menu_kind char(1),
    menu_main char(2),
    menu_sub char(2),
    menu_small char(2),
    menu_name varchar(100),
    menu_type char(1),
    menu_url varchar(100),
    PRIMARY KEY (menu_code)
);

drop table banners;

CREATE TABLE banners (
    banner_code int,
    banner_name varchar(100)DEFAULT NULL,
    banner_position char(1) DEFAULT NULL,
    banner_image_name varchar(200) DEFAULT NULL,
    banner_enable char(1) DEFAULT NULL,
    banner_bg_color varchar(100)DEFAULT NULL,
    banner_url varchar(200)DEFAULT NULL,
    PRIMARY KEY (banner_code)
);

drop table sliders;

CREATE TABLE sliders (
    slider_code int,
    slider_name varchar(100)DEFAULT NULL,
    slider_position char(1) DEFAULT NULL,
    slider_image_name varchar(200) DEFAULT NULL,
    slider_enable char(1) DEFAULT NULL,
    slider_url varchar(200)DEFAULT NULL,
    PRIMARY KEY (slider_code)
);

drop table movies;

CREATE TABLE movies (
  movie_code int,
  movie_name varchar(100) DEFAULT NULL,
  movie_type char(1) DEFAULT NULL,
  screening_time char(4) DEFAULT NULL,
  age_restriction varchar(20) DEFAULT NULL,
  view_count int DEFAULT NULL,
  screening_start_date char(8) DEFAULT NULL,
  screening_end_date char(8) DEFAULT NULL,
  interest_count int DEFAULT NULL,
  movie_story varchar(2000) DEFAULT NULL,
  movie_genre varchar(100) DEFAULT NULL,
  nationality varchar(100) DEFAULT NULL,
  director varchar(100) DEFAULT NULL,
  movie_image_name varchar(200) DEFAULT NULL,
  registration_date char(8) DEFAULT NULL,
  user_code int DEFAULT NULL,
  PRIMARY KEY (movie_code)
);


drop table common_codes;

CREATE TABLE common_codes (
    common_kind_code varchar(20) not null,
    common_code char(2) not null,
    common_name varchar(200) not null,
    PRIMARY KEY (common_kind_code, common_code)
);

drop table movie_actors;

CREATE TABLE movie_actors (
    movie_code int,
    actor_code int,
    actor_name varchar(100),
    PRIMARY KEY (movie_code, actor_code)
);

drop table actots;

-- actots 테이블 생성 스크립트
CREATE TABLE actots (
    actor_code int,
    actor_name varchar(100),
    birth_date char(8),
    nationality varchar(100),
    PRIMARY KEY (actor_code)
);

drop table movie_trailers;

-- movie_trailers 테이블 생성 스크립트
CREATE TABLE movie_trailers (
    movie_code int,
    trailer_code int,
    trailer_name varchar(100),
    trailer_image_name varchar(100),
    PRIMARY KEY (movie_code, trailer_code)
);


drop table movie_still_cuts;

-- movie_still_cuts 테이블 생성 스크립트
CREATE TABLE movie_still_cuts (
    movie_code int,
    still_cut_code int,
    still_cut_image_name varchar(200),
    PRIMARY KEY (movie_code, still_cut_code)
);