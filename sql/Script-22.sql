drop table seat_structures;

CREATE TABLE seat_structures (
    cinema_code INT  not null,
    theater_code INT  not null,
    seat_row VARCHAR(2) not null,
    seat_col VARCHAR(2),
    seat_type VARCHAR(10),
    PRIMARY KEY (cinema_code, theater_code, seat_row, seat_col)
);

select * from seat_structures

drop table cinemas;

CREATE TABLE cinemas (
    cinema_code INT AUTO_INCREMENT,
    cinema_name VARCHAR(100) not null,
    post_code CHAR(5),
    address VARCHAR(200),
    detail_address VARCHAR(200),
    public_transport_info VARCHAR(2000),
    parking_info VARCHAR(2000),
    longitude VARCHAR(10),
    latitude VARCHAR(10),
    region_code INT DEFAULT 0,
    user_code INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    PRIMARY KEY (cinema_code)
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

commit

insert into common_codes  
select 'theater_type' as common_kind_code,  menu_small as common_code, menu_name as common_name
from menus m 
where menu_main = '03'
and menu_sub = '02'
and menu_small  != '00'
