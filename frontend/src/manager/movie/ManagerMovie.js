import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KbButton from 'components/KbButton';
import KbGrid from 'components/KbGrid';
import KbComboInButton from 'components/KbComboInButton';
import KbRadioButton from 'components/KbRadioButton';
import KbInputDate from 'components/KbInputDate';
import 'manager/movie/ManagerMovie.css';

const ManagerMovie = () => {
  const [movies, setMovies] = useState([]);
  const [ageRestrictions, setAgeRestrictions] = useState([]);
  const [movieTypes, setMovieTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changDataCheck, setChangDataCheck] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [insertButtonState, setInsertButtonState] = useState(true);
  const [updateButtonState, setUpdateButtonState] = useState(true);
  const [deleteButtonState, setDeleteButtonState] = useState(true);

  const [movieCode, setMovieCode] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieType, setMovieType] = useState("");
  const [screeningTime, setScreeningTime] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [screeningStartDate, setScreeningStartDate] = useState("");
  const [screeningEndDate, setScreeningEndDate] = useState("");
  const [interestCount, setInterestCount] = useState("");
  const [movieStory, setMovieStory] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [nationality, setNationality] = useState("");
  const [director, setDirector] = useState("");
  const [movieImageName, setMovieImageName] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [userCode, setUserCode] = useState("");

  const [columnDefs] = useState([
    { headerName: '선택', checkboxSelection: true, width: 50, align: 'center', search: false },
    { headerName: '코드', field: 'movie_code', width: 50, align: 'center', chartype: 'number' },
    { headerName: '영화명', field: 'movie_name', width: 220, align: 'left', chartype: 'string', search: true },
    { headerName: '상영시작일', field: 'screening_start_date', width: 110, align: 'center', chartype: 'date' },
    { headerName: '상영종료일', field: 'screening_end_date', width: 110, align: 'center', chartype: 'date' },
    { headerName: '등록일', field: 'registration_date', width: 100, align: 'center', chartype: 'date' },
  ]);

  const today = new Date();
  let nowDate = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');

  const handleInitClick = () => {
    setMovieCode("");
    setMovieName("");
    setMovieType("1");
    setScreeningTime("");
    setAgeRestriction("1");
    setViewCount(0);
    setScreeningStartDate(nowDate);
    setScreeningEndDate(nowDate);
    setInterestCount(0);
    setMovieStory("");
    setMovieGenre("");
    setNationality("");
    setDirector("");
    setMovieImageName("");
    setRegistrationDate(nowDate);
    setUserCode("");
    setImagePreview(null);
    document.getElementById('fileInput').value = '';
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies`);
        if (response.data && response.data.length > 0) {
          setMovies(response.data);
          // setTimeout(() => {
          //   handleInitClick();
          // }, 0);
          handleInitClick();
        }
      } catch (error) {
        console.error('There was an error fetching the best movies!', error);
      }
    };

    fetchMovies();
  }, [changDataCheck]);

  useEffect(() => {
    const fetchCommonCodes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/common_codes`);
        if (response.data) {
          setMovieTypes(response.data.filter(commonData => commonData.common_kind_code === "movie_type"));
          setAgeRestrictions(response.data.filter(commonData => commonData.common_kind_code === "age_restriction"));
        }
      } catch (error) {
        console.error('There was an error fetching the best CommonCodes!', error);
      } finally {
        setLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 변경
      }
    };

    fetchCommonCodes();
  }, []);

  //신규, 수정, 삭제 상태에 따라 버튼 활성화
  useEffect(() => {
    if (movieCode === "") {
      setInsertButtonState(true);
      setUpdateButtonState(false);
      setDeleteButtonState(false);
    } else {
      setInsertButtonState(false);
      setUpdateButtonState(true);
      setDeleteButtonState(true);
    }
  }, [movieCode]);

  if (loading) {
    // 로딩 중일 때 표시할 내용
    return <p>Loading data...</p>;
  }

  if (!movieTypes || !ageRestrictions) {
    // 데이터가 제대로 로드되지 않았을 때 처리
    return <p>No data available</p>;
  }

  const handleCreateClick = async () => {

    if (!validateCheck()) {
      return; 
    }

    const formData = new FormData();

    // 텍스트 데이터 추가
    formData.append('movie_name', movieName);
    formData.append('movie_type', movieType);
    formData.append('screening_time', screeningTime);
    formData.append('age_restriction', ageRestriction);
    formData.append('view_count', viewCount);
    formData.append('screening_start_date', screeningStartDate);
    formData.append('screening_end_date', screeningEndDate);
    formData.append('interest_count', interestCount);
    formData.append('movie_story', movieStory);
    formData.append('movie_genre', movieGenre);
    formData.append('nationality', nationality);
    formData.append('director', director);
    formData.append('registration_date', registrationDate);
    formData.append('user_code', userCode);

    // 이미지 파일 추가
    if (imageFile) {
      formData.append('movie_image_name', imageFile);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/createmovies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('자료가 저장되었습니다.');
      setChangDataCheck(!changDataCheck);
    } catch (error) {
      console.error('Error creating the movie:', error);
    }
  };

  const handleUpdateClick = async () => {
    if (!validateCheck()) {
      return; 
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/updatemovies/${movieCode}`, {
        movie_name: movieName,
        movie_type: movieType,
        screening_time: screeningTime,
        age_restriction: ageRestriction,
        view_count: viewCount,
        screening_start_date: screeningStartDate,
        screening_end_date: screeningEndDate,
        interest_count: interestCount,
        movie_story: movieStory,
        movie_genre: movieGenre,
        nationality: nationality,
        director: director,
        movie_image_name: movieImageName,
        registration_date: registrationDate,
        user_code: userCode,
      });
      alert("자료가 수정되었습니다.");
      setChangDataCheck(!changDataCheck);
    } catch (error) {
      console.error('Error updating the movies:', error);
    }
  };

  const handleDeleteClick = async () => {
    const userConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (userConfirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/deletemovies/${movieCode}`);
        alert("선택한자료가 삭제되었습니다.");
        setChangDataCheck(!changDataCheck);
      } catch (error) {
        console.error('Error Delete the movies:', error);
      }
    };
  };

  const validateCheck = () => {
    if (!movieName || movieName.trim() === '') {
      alert('영화 이름을 입력해주세요.');
      return false;
    }
    if (!movieType || movieType.trim() === '') {
      alert('영화 유형을 입력해주세요.');
      return false;
    }
    if (!screeningTime || screeningTime.trim() === '') {
      alert('상영 시간을 올바르게 입력해주세요.');
      return false;
    }
    if (!ageRestriction || ageRestriction.trim() === '') {
      alert('나이 제한을 숫자로 입력해주세요.');
      return false;
    }
    if (!screeningStartDate) {
      alert('상영 시작 날짜를 선택해주세요.');
      return false;
    }
    if (!screeningEndDate) {
      alert('상영 종료 날짜를 선택해주세요.');
      return false;
    }
    if (!movieGenre || movieGenre.trim() === '') {
      alert('영화 장르를 입력해주세요.');
      return false;
    }
    if (!director || director.trim() === '') {
      alert('감독 이름을 입력해주세요.');
      return false;
    }
    if (!movieImageName) {
      alert('이미지 파일을 선택해주세요.');
      return false;
    }
  
    return true; // 모든 유효성 검사를 통과한 경우
  };
  

  const handeAgeRestrictionateClick = (ageRestrictionate) => {
    setAgeRestriction(ageRestrictionate);
  };

  const handleMovieCodeClick = (movieCode) => {
    const findMovie = movies.find(movie => movie.movie_code === movieCode);
    if (findMovie) {
      setMovieCode(findMovie.movie_code);
      setMovieName(findMovie.movie_name);
      setMovieType(findMovie.movie_type);
      setScreeningTime(findMovie.screening_time);
      setAgeRestriction(findMovie.age_restriction);
      setViewCount(findMovie.view_count);
      setScreeningStartDate(findMovie.screening_start_date);
      setScreeningEndDate(findMovie.screening_end_date);
      setInterestCount(findMovie.interest_count);
      setMovieStory(findMovie.movie_story);
      setMovieGenre(findMovie.movie_genre);
      setNationality(findMovie.nationality);
      setDirector(findMovie.director);
      setMovieImageName(findMovie.movie_image_name);
      setRegistrationDate(findMovie.registration_date);
      setUserCode(findMovie.user_code);
    }
  };


  const handleMovieTypeClick = (movieType) => {
    setMovieType(movieType);
  };

  const handleScreeningStartDateChange = (year, month, day) => {
    const formatDate = year + month + day;
    setScreeningStartDate(formatDate);
  };

  const handleScreeningEndDateChange = (year, month, day) => {
    const formatDate = year + month + day;
    setScreeningEndDate(formatDate);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setMovieImageName(file.name);
      setImageFile(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='manager-movie-wrap'>
      <div className='manager-movie-left-panel'>
        <div className='manager-movie-left-header'>
          <div className='manager-movie-left-title'>영화관리</div>
        </div>
        <div className='manager-movie-left-grid'>
          {movies && movies.length > 0 && (
            <KbGrid
              columnDefsProp={columnDefs} // 컬럼 정의
              rowDataProp={movies} // 데이터
              rowSelectionProp={false} // 여러 행 선택 가능
              paginationProp={true} // 페이징 활성화
              paginationPageSizeProp={15} // 페이지당 10개 행 표시
              searchProp={true}
              keyProp={"movie_code"}
              onClick={handleMovieCodeClick}
            />
          )}
        </div>
      </div>
      <div className='manager-movie-right-panel'>
        <div className='manager-movie-right-header'>
          <div className='manager-movie-right-button'>
            <KbButton textProp={""} iconProp={"추가"} stateProp={insertButtonState} onClick={() => handleCreateClick('추가')} />
            <KbButton textProp={""} iconProp={"수정"} stateProp={updateButtonState} onClick={() => handleUpdateClick('수정')} />
            <KbButton textProp={"삭제"} iconProp={"삭제"} stateProp={deleteButtonState} onClick={() => handleDeleteClick('삭제')} />
            <KbButton textProp={""} iconProp={"초기화"} stateProp={true} onClick={() => handleInitClick('초기화')} />
          </div>
        </div>
        <div className='manager-movie-right-input'>
          <div className="manager-movie-right-input-line">
            <label htmlFor="" className="manager-movie-right-input-label">영화코드</label>
            <input className="width100 input_movie_code" type="text" disabled value={movieCode} />
          </div>
          <div className="manager-movie-right-input-line">
            <label htmlFor="" className="manager-movie-right-input-label">영화명<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="50" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} />
          </div>
          <div className="manager-movie-right-input-line">
            <label htmlFor="" className="manager-movie-right-input-label">영화구분<span className='compulsory-item'>*</span></label>
            <KbRadioButton itemProp={""} widthProp={"0"} itemDatasProp={movieTypes} selectedItemProp={movieType} onClick={handleMovieTypeClick} />
          </div>
          <div className="manager-movie-right-input-line">
            <div className="manager-movie-right-input-col">
              <label htmlFor="" className="manager-movie-right-input-label">상영시작일<span className='compulsory-item'>*</span></label>
              <KbInputDate dateProp={screeningStartDate} onChange={handleScreeningStartDateChange} />
            </div>
            <div className="manager-movie-right-input-col">
              <label htmlFor="" className="manager-movie-right-input-label">상영종료일<span className='compulsory-item'>*</span></label>
              <KbInputDate dateProp={screeningEndDate} onChange={handleScreeningEndDateChange} />
            </div>
          </div>
          <div className="manager-movie-right-input-line-group-flex">
            <div className="manager-movie-right-input-line-group">
              <div className="manager-movie-right-input-line">
                <label htmlFor="" className="manager-movie-right-input-label">상영시간<span className='compulsory-item'>*</span></label>
                <input className="width100" type="text" maxlength="4" value={screeningTime} onChange={(e) => { setScreeningTime(e.target.value) }} />분
              </div>
              <div className="manager-movie-right-input-line">
                <label htmlFor="" className="manager-movie-right-input-label">제한나이<span className='compulsory-item'>*</span></label>
                <KbComboInButton comboDataProp={ageRestrictions} userProp={ageRestriction} comboWidthProp={80} comboHeightProp={24} onClick={handeAgeRestrictionateClick} />
              </div>
              <div className="manager-movie-right-input-line">
                <label htmlFor="" className="manager-movie-right-input-label">장르<span className='compulsory-item'>*</span></label>
                <input className="width200" type="text" maxlength="80" value={movieGenre} onChange={(e) => { setMovieGenre(e.target.value) }} />
              </div>
              <div className="manager-movie-right-input-line">
                <label htmlFor="" className="manager-movie-right-input-label">감독<span className='compulsory-item'>*</span></label>
                <input className="width200" type="text" maxlength="80" value={director} onChange={(e) => { setDirector(e.target.value) }} />
              </div>
              <div className="manager-movie-right-input-line">
                <label htmlFor="" className="manager-movie-right-input-label">국적<span className='compulsory-item'>*</span></label>
                <input className="width200" type="text" maxlength="80" value={nationality} onChange={(e) => { setNationality(e.target.value) }} />
              </div>
            </div>
            <div className="manager-movie-right-input-line-group">
              <div className="manager-movie-right-input-line-img">
                <label htmlFor="fileInput" className="manager-movie-right-input-label">영화포스터<span className='compulsory-item'>*</span></label>
                <div>
                  {movieImageName && movieCode ? (
                    <img className="manager-movie-right-input-img-view" src={`${process.env.REACT_APP_IMAGE_URL}/images/movie/${movieImageName}`} alt="" />
                  ) : (
                    <>
                      {imagePreview ? (
                        <img src={imagePreview} alt="미리보기" className="manager-movie-right-input-img-view" />
                      ) : (
                        <div className="manager-movie-right-input-img-input">
                          <div>이미지등록</div>
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <input
                      type="file"
                      id="fileInput"
                      className="manager-movie-right-input-img-file-input"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="manager-movie-right-input-line story">
          <label htmlFor="" className="manager-movie-right-input-label">영화스토리<span className='compulsory-item'>*</span></label>
          <textarea className="manager-movie-right-input-textarea" value={movieStory} maxlength="1200" onChange={(e) => { setMovieStory(e.target.value) }}></textarea>
        </div>
      </div>
    </div>
  );
}

export default ManagerMovie;