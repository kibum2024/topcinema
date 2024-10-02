import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies.json`);
        if (response.data) {
          // console.log("response.data : ", response.data);
          setMovies(response.data);  // 가져온 데이터가 있을 때만 state에 저장
        }
      } catch (error) {
        console.error('There was an error fetching the movies!', error);
      }
    };

    fetchMovies();  // 비동기 함수 호출
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <div className="movie-list">
        {/* {console.log("movies : ", movies)} */}
        {movies.map(movie => (
          <div key={movie.movie_code} className="movie-item">
            <h2>{movie.movie_name}</h2>
            {/* 이미지 경로를 올바르게 지정 */}
            <img 
              src={`${process.env.REACT_APP_API_URL}/images/movie/${movie.movie_image_name}`} 
              alt={movie.movie_name} 
              style={{ width: '200px' }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
