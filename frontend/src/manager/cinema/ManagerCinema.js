import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import KbButton from 'components/KbButton';
import KbGrid from 'components/KbGrid';
import 'manager/cinema/ManagerCinema.css';

const ManagerCinema = () => {
  const isUserCode = useSelector((state) => state.userState.userCode);
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changDataCheck, setChangDataCheck] = useState(true);
  const [insertButtonState, setInsertButtonState] = useState(true);
  const [updateButtonState, setUpdateButtonState] = useState(true);
  const [deleteButtonState, setDeleteButtonState] = useState(true);

  const [cinemaCode, setCinemaCode] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [publicTransportInfo, setPublicTransportInfo] = useState("");
  const [parkingInfo, setParkingInfo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
    

  const [columnDefs] = useState([
    { headerName: '선택', checkboxSelection: true, width: 50, align: 'center', search: false },
    { headerName: '코드', field: 'cinema_code', width: 50, align: 'center', chartype: 'number' },
    { headerName: '영화관명', field: 'cinema_name', width: 320, align: 'left', chartype: 'string', search: true },
    { headerName: '등록일', field: 'created_at', width: 200, align: 'center', chartype: 'timestamp' },
  ]);

  const handleInitClick = () => {
    setCinemaCode("");
    setCinemaName("");
    setPostCode("");
    setAddress("");
    setDetailAddress("");
    setPublicTransportInfo("");
    setParkingInfo("");
    setLongitude("");
    setLatitude("");
    setRegionCode("");
    setUserCode(isUserCode);
    setCreatedAt("");
    setUpdatedAt("");
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cinemas`);
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
    if (cinemaCode === "") {
      setInsertButtonState(true);
      setUpdateButtonState(false);
      setDeleteButtonState(false);
    } else {
      setInsertButtonState(false);
      setUpdateButtonState(true);
      setDeleteButtonState(true);
    }
  }, [cinemaCode]);

  if (loading) {
    // 로딩 중일 때 표시할 내용
    return <p>Loading data...</p>;
  }

  const handleCreateClick = async () => {

    if (!validateCheck()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/createcinemas`, {
        cinema_code: cinemaCode,
        cinema_name: cinemaName,
        post_code: postCode,
        address: address,
        detail_address: detailAddress,
        public_transport_info: publicTransportInfo,
        parking_info: parkingInfo,
        longitude: longitude,
        latitude: latitude,
        region_code: regionCode,
        user_code: userCode,
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/updatecinemas/${cinemaCode}`, {
        cinema_name: cinemaName,
        post_code: postCode,
        address: address,
        detail_address: detailAddress,
        public_transport_info: publicTransportInfo,
        parking_info: parkingInfo,
        longitude: longitude,
        latitude: latitude,
        region_code: regionCode,
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
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/deletecinemas/${cinemaCode}`);
        alert("선택한자료가 삭제되었습니다.");
        setChangDataCheck(!changDataCheck);
      } catch (error) {
        console.error('Error Delete the movies:', error);
      }
    };
  };

  const handleCinemaCodeClick = (cinemaCode) => {
    const findCinema = cinemas.find(cinema => cinema.cinema_code === cinemaCode);
    if (findCinema) {
      setCinemaCode(findCinema.cinema_code);
      setCinemaName(findCinema.cinema_name);
      setPostCode(findCinema.post_code);
      setAddress(findCinema.address);
      setDetailAddress(findCinema.detail_address);
      setPublicTransportInfo(findCinema.public_transport_info);
      setParkingInfo(findCinema.parking_info);
      setLongitude(findCinema.longitude);
      setLatitude(findCinema.latitude);
      setRegionCode(findCinema.region_code);
      setCreatedAt(findCinema.created_at);
      setUpdatedAt(findCinema.updated_at);
    }
  };

  const validateCheck = () => {
    if (!cinemaName || cinemaName.trim() === '') {
      alert('Cinema name을(를) 입력해주세요.');
      return false;
    }
    if (!postCode || postCode.trim() === '') {
      alert('Post code을(를) 입력해주세요.');
      return false;
    }
    if (!address || address.trim() === '') {
      alert('Address을(를) 입력해주세요.');
      return false;
    }
    if (!detailAddress || detailAddress.trim() === '') {
      alert('Detail address을(를) 입력해주세요.');
      return false;
    }
    if (!publicTransportInfo || publicTransportInfo.trim() === '') {
      alert('Public transport_info을(를) 입력해주세요.');
      return false;
    }
    if (!parkingInfo || parkingInfo.trim() === '') {
      alert('Parking info을(를) 입력해주세요.');
      return false;
    }
    if (!longitude || longitude.trim() === '') {
      alert('Longitude을(를) 입력해주세요.');
      return false;
    }
    if (!latitude || latitude.trim() === '') {
      alert('Latitude을(를) 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleAddressClick = () => {
    const width = 500; // 우편번호 검색창의 가로 크기
    const height = 600; // 우편번호 검색창의 세로 크기
    const left = Math.ceil((window.innerWidth - width) / 2); // 화면 가운데 계산
    const top = Math.ceil((window.innerHeight - height) / 2); // 화면 가운데 계산

    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address; // 선택된 주소
        // let roadAddressCode = data.roadAddressCode; // 도로명 주소 코드
        let postcode = data.zonecode;
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

        setAddress(fullAddress); 
        setPostCode(postcode);
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
              keyProp={"cinema_code"}
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
            <input className="width100 input_movie_code" type="text" disabled value={cinemaCode} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">영화관명<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="50" value={cinemaName} onChange={(e) => { setCinemaName(e.target.value) }} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">주소<span className='compulsory-item'>*</span></label>
            <input className="width50" type="text" maxlength="5" disabled value={postCode} />
            <div className="manager-cinema-right-input-button">
              <KbButton textProp={"검색"} iconProp={"검색"} stateProp={true} onClick={() => handleAddressClick('검색')} />
            </div>
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">기본주소<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="100" disabled value={address} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">상세주소<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="100" value={detailAddress} onChange={(e) => { setDetailAddress(e.target.value) }} />
          </div>
          <div className="manager-cinema-right-input-line">
            <label htmlFor="" className="manager-cinema-right-input-label">경도<span className='compulsory-item'>*</span></label>
            <input className="width150" type="text" maxlength="10" value={longitude} onChange={(e) => { setLongitude(e.target.value) }} />
            <label htmlFor="" className="manager-cinema-right-input-label">위도<span className='compulsory-item'>*</span></label>
            <input className="width150" type="text" maxlength="10" value={latitude} onChange={(e) => { setLatitude(e.target.value) }} />
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