select * from movies m 

select * from movie_actors

select * from movie_trailers

select * from movie_still_cuts msc 

select * from sliders

select * from menus
where menu_type = "2"
and menu_kind = "1"
order by menu_code 

ALTER TABLE menus
MODIFY COLUMN menu_code INT;

ALTER TABLE menus
ADD COLUMN menu_component varchar(100)DEFAULT NULL;

ALTER TABLE movies DROP COLUMN image_path;

select * from banners

select * from movie_reviews mr 

commit;

insert into movie_reviews (
select 
4 as movie_code, registration_date, user_code, review, sympathy_count, rating
from movie_reviews mr
where movie_code = 1)

update movie_reviews set rating = rating * 2;


update menus set menu_type = "1";

commit;

ALTER TABLE banner
ADD COLUMN banner_url varchar(100)DEFAULT NULL;


ALTER TABLE movies MODIFY COLUMN age_restriction CHAR(1);


RENAME TABLE slider TO sliders;

use movies_db;

select * from banners
where banner_position = "1"
order by rand()
limit 1;

where banner_position = "1"

-- 무작위로 한건 선택
SELECT *
FROM 테이블명
ORDER BY RAND()
LIMIT 1;

--베스트 영화

select a.movie_name, a.age_restriction, a.movie_image_name
from movies a, movie_reviews b
where a.screening_end_date >= DATE_FORMAT(SYSDATE(), '%Y%m%d')
and a.movie_code = b.movie_code 

select * from movies a


select 
	row_number() over(order by age_restriction) as ranking,
	a.movie_name, a.age_restriction, a.movie_image_name, 
    case 
        when datediff(a.screening_start_date, curdate()) > 0 
            then concat('d-', datediff(a.screening_start_date, curdate()))
        else 'play'
    end as screening_status,
	b.movie_code, 
	avg(b.rating) as rating,
	'15.2%' as reservation_rate
from movies a, movie_reviews b
where a.screening_end_date >= date_format(sysdate(), '%y%m%d')
and a.movie_code = b.movie_code 
group by b.movie_code 

SELECT 
    CASE 
        WHEN DATEDIFF(a.screening_start_date, CURDATE()) > 0 
            THEN CONCAT('D-', DATEDIFF(a.screening_start_date, CURDATE()))
        ELSE '15.2%'
    END AS screening_status
FROM movies a
WHERE a.screening_end_date >= DATE_FORMAT(CURDATE(), '%Y%m%d');

select sysdate(), a.* from movie_reviews a

select date_format(sysdate(), '%Y%m%d') as aaa, a.* from movies a

where a.screening_end_date >= date_format(sysdate(), '%y%m%d')

select * 
from movies a, movie_reviews b
where a.screening_end_date >= date_format(sysdate(), '%y%m%d')
and a.movie_code = b.movie_code 


select 
	row_number() over(order by age_restriction) as ranking,
	a.movie_name, a.age_restriction, a.movie_image_name, 
    case 
        when datediff(a.screening_start_date, curdate()) > 0 
            then concat('d-', datediff(a.screening_start_date, curdate()))
        else 'play'
    end as screening_status,
	b.movie_code, 
	avg(b.rating) as rating,
	'15.2%' as reservation_rate,
	sysdate() as date_time
from movies a, movie_reviews b
where a.screening_end_date >= date_format(sysdate(), '%Y%m%d')
and a.movie_code = b.movie_code 
group by b.movie_code 

SELECT 
    ROW_NUMBER() OVER(ORDER BY a.age_restriction) AS ranking,
    a.movie_name, 
	a.age_restriction,
	c.common_name,
    a.movie_image_name, 
    CASE 
        WHEN DATEDIFF(a.screening_start_date, CURDATE()) > 0 
            THEN CONCAT('D-', DATEDIFF(a.screening_start_date, CURDATE()))
        ELSE 'play'
    END AS screening_status,
    a.movie_code, 
    AVG(b.rating) AS rating,
    '15.2%' AS reservation_rate
FROM 
    movies a
LEFT JOIN 
    movie_reviews b ON a.movie_code = b.movie_code
LEFT JOIN 
    common_codes c ON c.common_kind_code = "age_restriction"
    			   and a.age_restriction = c.common_code 
WHERE 
    a.screening_end_date >= DATE_FORMAT(SYSDATE(), '%Y%m%d')
GROUP BY 
    a.movie_code
LIMIT 20;
