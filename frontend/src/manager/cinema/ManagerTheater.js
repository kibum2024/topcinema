import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import KbButton from 'components/KbButton';
import KbGrid from 'components/KbGrid';
import KbComboInButton from 'components/KbComboInButton';
import KbSearchInputNoTitle from 'components/KbSearchInputNoTitle';
import 'manager/cinema/ManagerTheater.css';


const ManagerTheater = () => {
  const isUserCode = useSelector((state) => state.userState.userCode);
  const [cinemas, setCinemas] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [theaterTypes, setTheaterTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changDataCheck, setChangDataCheck] = useState(true);
  const [insertButtonState, setInsertButtonState] = useState(true);
  const [updateButtonState, setUpdateButtonState] = useState(true);
  const [deleteButtonState, setDeleteButtonState] = useState(true);
  const fileInputRef = useRef(null);
  const [seatInfos, setSeatInfos] = useState([]);


  const [theaterCode, setTheaterCode] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [cinemaCode, setCinemaCode] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [theaterType, setTheaterType] = useState("");
  const [userCode, setUserCode] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [columnDefs] = useState([
    { headerName: '선택', checkboxSelection: true, width: 50, align: 'center', search: false },
    { headerName: '코드', field: 'cinema_code', width: 50, align: 'center', chartype: 'number' },
    { headerName: '영화관명', field: 'cinema_name', width: 200, align: 'left', chartype: 'string', search: true },
    { headerName: '코드', field: 'theater_code', width: 50, align: 'center', chartype: 'number' },
    { headerName: '관람관명', field: 'theater_name', width: 120, align: 'left', chartype: 'string', search: true },
    { headerName: '등록일', field: 'created_at', width: 130, align: 'center', chartype: 'timestamp' },
  ]);

  const handleInitClick = () => {
    setTheaterCode("");
    setTheaterName("");
    setCinemaCode("");
    setCinemaName("");
    setTheaterType("01");
    setUserCode(isUserCode);
    setCreatedAt("");
    setUpdatedAt("");
  };

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theaters`);
        if (response.data && response.data.length > 0) {
          setTheaters(response.data);
          handleInitClick();
        }
      } catch (error) {
        console.error('There was an error fetching the best movies!', error);
      }
    };

    fetchTheaters();
  }, [changDataCheck]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cinemas`);
        if (response.data && response.data.length > 0) {
          setCinemas(response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the best movies!', error);
      }
    };

    fetchCinemas();
  }, []);

  useEffect(() => {
    const fetchCommonCodes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/common_codes`);
        if (response.data) {
          setTheaterTypes(response.data.filter(commonData => commonData.common_kind_code === "theater_type"));
        }
      } catch (error) {
        console.error('There was an error fetching the CommonCodes!', error);
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/createtheaters`, {
        theater_code: theaterCode,
        theater_name: theaterName,
        cinema_code: cinemaCode,
        theater_type: theaterType,
        user_code: userCode,
        created_at: createdAt,
        updated_at: updatedAt,
      });
      alert('자료가 저장되었습니다.');
      setChangDataCheck(!changDataCheck);
    } catch (error) {
      console.error('Error creating :', error);
    }
  };

  const handleUpdateClick = async () => {
    if (!validateCheck()) {
      return;
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/updatetheaters/${theaterCode}`, {
        theater_name: theaterName,
        cinema_code: cinemaCode,
        theater_type: theaterType,
        user_code: userCode,
        created_at: createdAt,
        updated_at: updatedAt,
      });
      alert("자료가 수정되었습니다.");
      setChangDataCheck(!changDataCheck);
    } catch (error) {
      console.error('Error updating :', error);
    }
  };

  const handleDeleteClick = async () => {
    const userConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (userConfirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/deletetheaters/${theaterCode}`);
        alert("선택한자료가 삭제되었습니다.");
        setChangDataCheck(!changDataCheck);
      } catch (error) {
        console.error('Error Delete :', error);
      }
    };
  };

  const handleTheaterCodeClick = (theaterCode) => {
    const findTheater = theaters.find(theater => theater.theater_code === theaterCode);
    // console.log("theaterCode : ", theaterCode);
    // console.log("findTheater : ", findTheater);
    if (findTheater) {
      setTheaterCode(findTheater.theater_code);
      setTheaterName(findTheater.theater_name);
      setCinemaCode(findTheater.cinema_code);
      setCinemaName(findTheater.cinema_name);
      setTheaterType(findTheater.theater_type);
      setUserCode(findTheater.user_code);
      setCreatedAt(findTheater.created_at);
      setUpdatedAt(findTheater.updated_at);
    }
  };

  const validateCheck = () => {
    if (!theaterName || theaterName.trim() === '') {
      alert('Theater name을(를) 입력해주세요.');
      return false;
    }
    if (!theaterType || theaterType.trim() === '') {
      alert('Theater type을(를) 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleMovieTypeClick = (theaterType) => {
    setTheaterType(theaterType);
  };

  const handleCinemaClick = (cinaemaCode, cinemaName) => {
    console.log("cinaemaCode : ", cinaemaCode);
    console.log("cinemaName : ", cinemaName);

    setCinemaCode(cinaemaCode);
    setCinemaName(cinemaName);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();  // 숨겨진 input 요소 클릭 트리거
  };

  const handleUploadExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        setSeatInfos(csvToJson(text));
      };
      reader.readAsText(file);
    }
    event.target.value = null;
  };

  const csvToJson = (csv) => {
    const rows = csv.split('\n');
    const result = { rows: [] };
    let seatCount = 1;

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i].split(',');
      const rowNumber = cols[0];
      const seats = [];

      seatCount = 1;
      for (let j = 1; j < cols.length; j++) {
        let seatType = "";
        let seatNumber = "";
        let colstr = cols[j].trim();
        if (colstr === "TR") {
          seatType = "aisle";
          seatNumber = "";
        } else if (colstr === "BK") {
          seatType = "blank";
          seatNumber = "";
          seatCount += 1;
        } else if (colstr === "/") {
          seatType = "handicap";
          seatNumber = seatCount;
          seatCount += 1;
        } else {
          seatType = "seat";
          seatNumber = colstr;
          seatCount += 1;
        };
        seats.push({ seat_number: seatNumber, type: seatType, reserved: "false", selected: "false" });
      }

      result.rows.push({ row_number: rowNumber, seats: seats });
    }

    return result;
  }



  return (
    <div className='manager-theater-wrap'>
      <div className='manager-theater-left-panel'>
        <div className='manager-theater-left-header'>
          <div className='manager-theater-left-title'>관람관관리</div>
        </div>
        <div className='manager-theater-left-grid'>
          {theaters && theaters.length > 0 && (
            <KbGrid
              columnDefsProp={columnDefs} // 컬럼 정의
              rowDataProp={theaters} // 데이터
              rowSelectionProp={false} // 여러 행 선택 가능
              paginationProp={true} // 페이징 활성화
              paginationPageSizeProp={15} // 페이지당 10개 행 표시
              searchProp={true}
              keyProp={"theater_code"}
              onClick={handleTheaterCodeClick}
            />
          )}
        </div>
      </div>
      <div className='manager-theater-right-panel'>
        <div className='manager-theater-right-header'>
          <div className='manager-theater-right-button'>
            <KbButton textProp={""} iconProp={"추가"} stateProp={insertButtonState} onClick={() => handleCreateClick('추가')} />
            <KbButton textProp={""} iconProp={"수정"} stateProp={updateButtonState} onClick={() => handleUpdateClick('수정')} />
            <KbButton textProp={"삭제"} iconProp={"삭제"} stateProp={deleteButtonState} onClick={() => handleDeleteClick('삭제')} />
            <KbButton textProp={""} iconProp={"초기화"} stateProp={true} onClick={() => handleInitClick('초기화')} />
          </div>
        </div>
        <div className='manager-theater-right-input'>
          <div className="manager-theater-right-input-line">
            <label htmlFor="" className="manager-theater-right-input-label">영화관<span className='compulsory-item'>*</span></label>
            <KbSearchInputNoTitle
              itemProp={"영화관"}
              codeWidthProp={80}
              nameWidthProp={200}
              heightProp={25}
              inputDatasProp={cinemas}
              codeProp={"cinema_code"}
              nameProp={"cinema_name"}
              codeValueProp={cinemaCode}
              nameValueProp={cinemaName}
              onClick={handleCinemaClick}
            />
          </div>
          <div className="manager-theater-right-input-line">
            <label htmlFor="" className="manager-theater-right-input-label">관람관코드</label>
            <input className="width100 input_movie_code" type="text" disabled value={theaterCode} />
          </div>
          <div className="manager-theater-right-input-line">
            <label htmlFor="" className="manager-theater-right-input-label">관람관명<span className='compulsory-item'>*</span></label>
            <input className="width400" type="text" maxlength="50" value={theaterName} onChange={(e) => { setTheaterName(e.target.value) }} />
          </div>
          <div className="manager-theater-right-input-line">
            <label htmlFor="" className="manager-theater-right-input-label">관람관구분<span className='compulsory-item'>*</span></label>
            <KbComboInButton comboDataProp={theaterTypes} userProp={theaterType} comboWidthProp={100} comboHeightProp={24} onClick={handleMovieTypeClick} />
          </div>
          <div className="manager-theater-right-input-line">
            <label htmlFor="" className="manager-theater-right-input-label">관람석<span className='compulsory-item'>*</span></label>
            <KbButton textProp={"엑셀업로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleButtonClick()} />
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleUploadExcel}
            />
          </div>
          <div class="movie-screen">S  C  R  E  E  N</div>
          <div>
            {seatInfos.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                <h3>Row {row.row_number}</h3>
                <div className="seats">
                  {row.seats.map((seat, seatIndex) => (
                    <div
                      key={seatIndex}
                      className={`seat ${seat.reserved === 'true' ? 'reserved' : ''} ${seat.selected === 'true' ? 'selected' : ''}`}
                    >
                      Seat {seat.seat_number}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerTheater;