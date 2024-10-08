CREATE TABLE user_memberships (
    user_code INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(100),
    user_name VARCHAR(100),
    user_phone VARCHAR(20),
    user_type CHAR(1),
    is_active CHAR(1),
    user_password VARCHAR(30),
    membership_type CHAR(1),
    registration_date CHAR(8),
    membership_grade CHAR(1),
    birth_date CHAR(8)
);

CREATE TABLE user_permissions (
    user_code INT,
    menu_code INT,
    permission_insert CHAR(1),
    permission_update CHAR(1),
    permission_delete CHAR(1),
    permission_select CHAR(1),
    PRIMARY KEY (user_code, menu_code)
);

CREATE TABLE user_favorite_cinemas (
    user_code INT,
    movie_code INT,
    registration_date CHAR(8),
    PRIMARY KEY (user_code, movie_code)
);

CREATE TABLE user_payment_historys (
    user_code INT,
    payment_code INT AUTO_INCREMENT,
    PRIMARY KEY (user_code, payment_code)
);

CREATE TABLE user_coupon_boxs (
    user_code INT,
    coupon_code INT AUTO_INCREMENT,
    is_active CHAR(1),
    PRIMARY KEY (user_code, coupon_code)
);

CREATE TABLE user_movie_logs (
    user_code INT,
    movie_type CHAR(1),
    movie_code INT AUTO_INCREMENT,
    PRIMARY KEY (user_code, movie_type, movie_code)
);

CREATE TABLE regions (
    region_code INT AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR(100),
    region_type CHAR(2)
);

CREATE TABLE movies (
    movie_code INT AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(100),
    screening_time CHAR(4),
    age_restriction CHAR(1),
    screening_type CHAR(1),
    view_count INT,
    screening_start_date CHAR(8),
    screening_end_date CHAR(8),
    interest_count INT,
    movie_story VARCHAR(2000),
    movie_genre VARCHAR(100),
    nationality VARCHAR(100),
    director VARCHAR(100),
    movie_image_name VARCHAR(200),
    registration_date CHAR(8),
    user_code INT
);

CREATE TABLE movie_trailers (
    movie_code INT,
    trailer_code INT AUTO_INCREMENT,
    trailer_name VARCHAR(100),
    trailer_video_name VARCHAR(100),
    PRIMARY KEY (movie_code, trailer_code)
);

CREATE TABLE movie_still_cuts (
    movie_code INT,
    still_cut_code INT AUTO_INCREMENT,
    still_cut_image_name VARCHAR(200),
    PRIMARY KEY (movie_code, still_cut_code)
);

CREATE TABLE movie_actors (
    movie_code INT,
    actor_code INT AUTO_INCREMENT,
    PRIMARY KEY (movie_code, actor_code)
);

CREATE TABLE actots (
    actor_code INT AUTO_INCREMENT PRIMARY KEY,
    actor_name VARCHAR(100),
    birth_date CHAR(8),
    nationality VARCHAR(100)
);

CREATE TABLE movie_by_actors (
    actor_code INT,
    movie_code INT AUTO_INCREMENT,
    PRIMARY KEY (actor_code, movie_code)
);

CREATE TABLE movie_reviews (
    movie_code INT,
    registration_date CHAR(8),
    user_code INT,
    review VARCHAR(300),
    sympathy_count INT,
    rating INT,
    PRIMARY KEY (movie_code, registration_date, user_code)
);

CREATE TABLE movie_screenings (
    theater_code INT,
    screen_code INT AUTO_INCREMENT,
    movie_code INT,
    screening_date CHAR(8),
    screening_time CHAR(4),
    reservation_count INT,
    registration_date CHAR(8),
    user_code INT,
    PRIMARY KEY (theater_code, screen_code)
);

CREATE TABLE movie_screenings_seat (
    theater_code INT,
    screen_code INT,
    movie_code INT,
    screening_date CHAR(8),
    screening_time CHAR(4),
    seat_row CHAR(1),
    seat_col INT,
    seat_type CHAR(1),
    reserved CHAR(1),
    PRIMARY KEY (theater_code, screen_code, movie_code, screening_date, screening_time, seat_row, seat_col)
);

CREATE TABLE cinemas (
    theater_code INT AUTO_INCREMENT PRIMARY KEY,
    theater_name VARCHAR(100),
    road_code CHAR(5),
    address VARCHAR(100),
    detail_address VARCHAR(100),
    public_transport_info VARCHAR(2000),
    parking_info VARCHAR(2000),
    longitude DECIMAL(2,6),
    latitude DECIMAL(2,6),
    region_code INT
);

CREATE TABLE movie_pricings (
    screen_type CHAR(1),
    screening_type CHAR(1),
    seat_kind CHAR(1),
    screening_day CHAR(8),
    adult_fee INT,
    teenager_fee INT,
    senior_fee INT,
    disabled_fee INT,
    child_fee INT,
    PRIMARY KEY (screen_type, screening_type, seat_kind, screening_day)
);

CREATE TABLE cinema_auditoriums (
    theater_code INT,
    screen_code INT AUTO_INCREMENT,
    screen_name VARCHAR(100),
    screen_type CHAR(1),
    seat_structure_code INT,
    PRIMARY KEY (theater_code, screen_code)
);

CREATE TABLE cinema_group_viewings (
    theater_code INT,
    movie_code INT,
    PRIMARY KEY (theater_code, movie_code)
);


CREATE TABLE events (
    event_code INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100),
    event_type CHAR(1),
    event_image_name VARCHAR(200),
    precautions VARCHAR(2000),
    event_start_date CHAR(8),
    event_end_date CHAR(8)
);

CREATE TABLE event_specific_entrys (
    event_code INT,
    user_code INT,
    winner_type CHAR(1),
    entry_date CHAR(8),
    entry_content VARCHAR(2000),
    PRIMARY KEY (event_code, user_code)
);

CREATE TABLE local_events (
    local_event_code INT AUTO_INCREMENT PRIMARY KEY,
    theater_code INT,
    event_title VARCHAR(100),
    event_content VARCHAR(2000),
    precautions VARCHAR(2000),
    event_start_date CHAR(8),
    event_end_date CHAR(8)
);

CREATE TABLE stores (
    product_code INT AUTO_INCREMENT PRIMARY KEY,
    product_type CHAR(1),
    product_name VARCHAR(100),
    product_description VARCHAR(2000),
    product_price INT,
    components VARCHAR(100),
    purchase_limit VARCHAR(100),
    validity_period VARCHAR(100),
    applicable_theaters VARCHAR(100),
    number_of_items INT
);

CREATE TABLE store_guides (
    product_code INT,
    product_title VARCHAR(100),
    product_description VARCHAR(2000),
    PRIMARY KEY (product_code)
);

CREATE TABLE menus (
    menu_code INT AUTO_INCREMENT PRIMARY KEY,
    menu_kind CHAR(1),
    menu_main CHAR(2),
    menu_sub CHAR(2),
    menu_small CHAR(2),
    menu_name VARCHAR(100),
    menu_type CHAR(1)
);

CREATE TABLE announcements (
    notice_code INT AUTO_INCREMENT PRIMARY KEY,
    notice_type CHAR(1),
    registration_date CHAR(8),
    view_count INT,
    notice_title VARCHAR(100),
    notice_content VARCHAR(2000)
);

CREATE TABLE inquirys (
    inquiry_code INT AUTO_INCREMENT PRIMARY KEY,
    inquiry_category CHAR(1),
    inquiry_type CHAR(2),
    inquiry_title VARCHAR(100),
    inquiry_content VARCHAR(2000),
    attachment VARCHAR(100),
    is_answer_received CHAR(1),
    is_data_consent CHAR(1),
    user_code INT
);

CREATE TABLE faqs (
    faq_code INT AUTO_INCREMENT PRIMARY KEY,
    faq_category CHAR(1),
    faq_title VARCHAR(100),
    faq_content VARCHAR(2000),
    registration_date CHAR(8)
);

CREATE TABLE lost_item_inquirys (
    lost_item_code INT AUTO_INCREMENT PRIMARY KEY,
    theater_code INT,
    lost_date CHAR(8),
    lost_start_time CHAR(4),
    lost_end_time CHAR(4),
    lost_type CHAR(1),
    lost_color CHAR(1),
    lost_content VARCHAR(2000),
    is_answer_received CHAR(1),
    is_data_consent CHAR(1),
    user_code INT
);
