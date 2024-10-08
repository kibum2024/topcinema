CREATE TABLE seat_structures (
    cinema_code INT  not null,
    theater_code INT  not null,
    seat_row INT  not null,
    seat_col INT  not null,
    seat_type CHAR(1),
    PRIMARY KEY (cinema_code, theater_code, seat_row, seat_col)
);

drop table cinemas;

CREATE TABLE cinemas (
    cinema_code INT AUTO_INCREMENT PRIMARY KEY,
    cinema_name VARCHAR(100) not null,
    road_code CHAR(5),
    address VARCHAR(100),
    detail_address VARCHAR(100),
    public_transport_info VARCHAR(2000),
    parking_info VARCHAR(2000),
    longitude DECIMAL(8,6) DEFAULT 0,
    latitude DECIMAL(8,6) DEFAULT 0,
    region_code INT  DEFAULT 0,
    registration_date CHAR(8),
    user_code INT

);



DROP table theaters;

CREATE TABLE theaters (
    theater_code INT AUTO_INCREMENT,  -- theater_code를 단일 PK로 설정
    cinema_code INT NOT NULL,          -- cinema_code를 외래키로 사용
    theater_name VARCHAR(100),
    theater_type CHAR(1),
    PRIMARY KEY (theater_code),        -- theater_code가 단일 PK
    FOREIGN KEY (cinema_code) REFERENCES cinemas(cinema_code)  -- cinemas 테이블의 cinema_code와 관계
);
