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
    cinema_code INT AUTO_INCREMENT,
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
    user_code INT,
    PRIMARY KEY (cinema_code),
);



DROP table theaters;

CREATE TABLE theaters (
    theater_code INT AUTO_INCREMENT,
    theater_name VARCHAR(100) not null,
    cinema_code INT NOT NULL,       
    theater_type CHAR(2),
    user_code INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    PRIMARY KEY (theater_code),        
    FOREIGN KEY (cinema_code) REFERENCES cinemas(cinema_code)  
);