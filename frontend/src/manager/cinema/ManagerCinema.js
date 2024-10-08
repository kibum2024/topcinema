import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KbButton from 'components/KbButton';
import KbGrid from 'components/KbGrid';
import KbComboInButton from 'components/KbComboInButton';
import KbRadioButton from 'components/KbRadioButton';
import KbInputDate from 'components/KbInputDate';
import 'manager/cinema/ManagerCinema.css';

const ManagerCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changDataCheck, setChangDataCheck] = useState(true);
  const [insertButtonState, setInsertButtonState] = useState(true);
  const [updateButtonState, setUpdateButtonState] = useState(true);
  const [deleteButtonState, setDeleteButtonState] = useState(true);

  const [theaterCode, setTheaterCode] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [roadCode, setRoadCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [publicTransportInfo, setPublicTransportInfo] = useState("");
  const [parkingInfo, setParkingInfo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [userCode, setUserCode] = useState("");

  const [columnDefs] = useState([
    { headerName: '선택', checkboxSelection: true, width: 50, align: 'center', search: false },
    { headerName: '코드', field: 'movie_code', width: 100, align: 'center', chartype: 'number' },
    { headerName: '영화관명', field: 'movie_name', width: 320, align: 'left', chartype: 'string', search: true },
    { headerName: '등록일', field: 'registration_date', width: 200, align: 'center', chartype: 'date' },
  ]);

  const handleInitClick = () => {
    // setMovieCode("");
    // setMovieName("");
    // setMovieType("1");
    // setScreeningTime("");
    // setAgeRestriction("1");
    // setViewCount(0);
    // setScreeningStartDate(nowDate);
    // setScreeningEndDate(nowDate);
    // setInterestCount(0);
    // setMovieStory("");
    // setMovieGenre("");
    // setNationality("");
    // setDirector("");
    // setMovieImageName("");
    // setRegistrationDate(nowDate);
    // setUserCode("");
    // setImagePreview(null);
    // document.getElementById('fileInput').value = '';
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies`);
        if (response.data && response.data.length > 0) {
          setCinemas(response.data);
          handleInitClick();
        }
      } catch (error) {
        console.error('There was an error fetching the best movies!', error);
      }
    };

    fetchCinemas();
  }, [changDataCheck]);

  useEffect(() => {
    const fetchCommonCodes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/common_codes`);
        if (response.data) {
          // setMovieTypes(response.data.filter(commonData => commonData.common_kind_code === "movie_type"));
          // setAgeRestrictions(response.data.filter(commonData => commonData.common_kind_code === "age_restriction"));
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
    if (theaterCode === "") {
      setInsertButtonState(true);
      setUpdateButtonState(false);
      setDeleteButtonState(false);
    } else {
      setInsertButtonState(false);
      setUpdateButtonState(true);
      setDeleteButtonState(true);
    }
  }, [theaterCode]);

  if (loading) {
    // 로딩 중일 때 표시할 내용
    return <p>Loading data...</p>;
  }

  const handleCreateClick = async () => {

    if (!validateCheck()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/createmovies`, {
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/updatemovies/${theaterCode}`, {
        // movie_name: movieName,
        // movie_type: movieType,
        // screening_time: screeningTime,
        // age_restriction: ageRestriction,
        // view_count: viewCount,
        // screening_start_date: screeningStartDate,
        // screening_end_date: screeningEndDate,
        // interest_count: interestCount,
        // movie_story: movieStory,
        // movie_genre: movieGenre,
        // nationality: nationality,
        // director: director,
        // movie_image_name: movieImageName,
        // registration_date: registrationDate,
        // user_code: userCode,
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
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/deletemovies/${theaterCode}`);
        alert("선택한자료가 삭제되었습니다.");
        setChangDataCheck(!changDataCheck);
      } catch (error) {
        console.error('Error Delete the movies:', error);
      }
    };
  };

  const validateCheck = () => {
    // if (!movieName || movieName.trim() === '') {
    //   alert('영화 이름을 입력해주세요.');
    //   return false;
    // }
    // if (!movieType || movieType.trim() === '') {
    //   alert('영화 유형을 입력해주세요.');
    //   return false;
    // }
    // if (!screeningTime || screeningTime.trim() === '') {
    //   alert('상영 시간을 올바르게 입력해주세요.');
    //   return false;
    // }
    // if (!ageRestriction || ageRestriction.trim() === '') {
    //   alert('나이 제한을 숫자로 입력해주세요.');
    //   return false;
    // }
    // if (!screeningStartDate) {
    //   alert('상영 시작 날짜를 선택해주세요.');
    //   return false;
    // }
    // if (!screeningEndDate) {
    //   alert('상영 종료 날짜를 선택해주세요.');
    //   return false;
    // }
    // if (!movieGenre || movieGenre.trim() === '') {
    //   alert('영화 장르를 입력해주세요.');
    //   return false;
    // }
    // if (!director || director.trim() === '') {
    //   alert('감독 이름을 입력해주세요.');
    //   return false;
    // }
    // if (!movieImageName) {
    //   alert('이미지 파일을 선택해주세요.');
    //   return false;
    // }

    return true; // 모든 유효성 검사를 통과한 경우
  };

  const handleCinemaCodeClick = (theaterCode) => {
    // const findMovie = movies.find(movie => movie.movie_code === movieCode);
    // if (findMovie) {
    //   setMovieCode(findMovie.movie_code);
    //   setMovieName(findMovie.movie_name);
    //   setMovieType(findMovie.movie_type);
    //   setScreeningTime(findMovie.screening_time);
    //   setAgeRestriction(findMovie.age_restriction);
    //   setViewCount(findMovie.view_count);
    //   setScreeningStartDate(findMovie.screening_start_date);
    //   setScreeningEndDate(findMovie.screening_end_date);
    //   setInterestCount(findMovie.interest_count);
    //   setMovieStory(findMovie.movie_story);
    //   setMovieGenre(findMovie.movie_genre);
    //   setNationality(findMovie.nationality);
    //   setDirector(findMovie.director);
    //   setMovieImageName(findMovie.movie_image_name);
    //   setRegistrationDate(findMovie.registration_date);
    //   setUserCode(findMovie.user_code);
    // }
  };

  const handleAddressClick = () => {
    const width = 500; // 우편번호 검색창의 가로 크기
    const height = 600; // 우편번호 검색창의 세로 크기
    const left = Math.ceil((window.innerWidth - width) / 2); // 화면 가운데 계산
    const top = Math.ceil((window.innerHeight - height) / 2); // 화면 가운데 계산

    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address; // 선택된 주소
        let roadAddressCode = data.roadAddressCode; // 도로명 주소 코드
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress);  // 검색된 주소를 상태에 저장
        setRoadCode(roadAddressCode); // 도로코드를 상태에 저장
      },
      width: width,
      height: height
    }).open({
      left: left,
      top: top
    });
  };

  return (
    <div className='manager-cinema-wrap'>
      <div className='manager-cinema-left-panel'>
        <div className='manager-cinema-left-header'>
          <div className='manager-cinema-left-title'>영화관관리</div>
        </div>
        <div className='manager-cinema-left-grid'>
          {cinemas && cinemas.length > 0 && (
            <KbGrid
              columnDefsProp={columnDefs} // 컬럼 정의
              rowDataProp={cinemas} // 데이터
              rowSelectionProp={false} // 여러 행 선택 가능
              paginationProp={true} // 페이징 활성화
              paginationPageSizeProp={15} // 페이지당 10개 행 표시
              searchProp={true}
              keyProp={"theater_code"}
              onClick={handleCinemaCodeClick}
            />
          )}
        </div>
      </div>
      <div className='manager-cinema-right-panel'>
        <div className='manager-cinema-right-header'>
          <div className='manager-cinema-right-button'>
            <KbButton textProp={""} iconProp={"추가"} stateProp={insertButtonState} onClick={() => handleCreateClick('추가')} />
            <KbButton textProp={""} iconProp={"수정"} stateProp={updateButtonState} onClick={() => handleUpdateClick('수정')} />
            <KbButton textProp={"삭제"} iconProp={"삭제"} stateProp={deleteButtonState} onClick={() => handleDeleteClick('삭제')} />
            <KbButton textProp={""} iconProp={"초기화"} stateProp={true} onClick={() => handleInitClick('초기화')} />
          </div>
        </div>
        <div className='manager-cinema-right-input'>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">영화관코드</label>
            <input className="width100 input_movie_code" type="text" disabled value={theaterCode} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">영화관명<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="50" value={theaterName} onChange={(e) => { setTheaterName(e.target.value) }} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">주소<span className='compulsory-item'>*</span></label>
            <input className="width50" type="text" maxlength="4" disabled value={roadCode} onChange={(e) => { setRoadCode(e.target.value) }} />
            <div className="manager-cinema-right-input-button">
              <KbButton textProp={"검색"} iconProp={"검색"} stateProp={true} onClick={() => handleAddressClick('검색')} />
            </div>
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">기본주소<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="4" value={address} onChange={(e) => { setAddress(e.target.value) }} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">상세주소<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="4" value={detailAddress} onChange={(e) => { setDetailAddress(e.target.value) }} />
          </div>
          <div className="manager-cinema-right-input-line">
            <div className="manager-movie-right-input-col">
              <label htmlFor="" className="manager-cinema-right-input-label">경도<span className='compulsory-item'>*</span></label>
              <input className="width150" type="text" maxlength="4" value={longitude} onChange={(e) => { setLongitude(e.target.value) }} />
            </div>
            <div className="manager-movie-right-input-col">
              <label htmlFor="" className="manager-cinema-right-input-label">위도<span className='compulsory-item'>*</span></label>
              <input className="width150" type="text" maxlength="4" value={latitude} onChange={(e) => { setLatitude(e.target.value) }} />
            </div>
          </div>
          <div className="manager-cinema-right-input-line area">
            <label htmlFor="" className="manager-cinema-right-input-label">대중교통안내<span className='compulsory-item'>*</span></label>
            <textarea className="manager-cinema-right-input-textarea" value={publicTransportInfo} maxlength="1200" onChange={(e) => { setPublicTransportInfo(e.target.value) }}></textarea>
          </div>
          <div className="manager-cinema-right-input-line area">
            <label htmlFor="" className="manager-cinema-right-input-label">주차안내<span className='compulsory-item'>*</span></label>
            <textarea className="manager-cinema-right-input-textarea" value={parkingInfo} maxlength="1200" onChange={(e) => { setParkingInfo(e.target.value) }}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerCinema;