import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://43.203.201.45:8080/api/movies');
        if (response.data) {
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
        {movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <h2>{movie.title}</h2>
            {/* 이미지 경로를 올바르게 지정 */}
            <img 
              src={`${process.env.REACT_APP_API_URL}/images/${movie.imagePath}`} 
              alt={movie.title} 
              style={{ width: '200px' }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
