import React, { useState, useEffect, useRef } from 'react';
import Kbbutton from './KbButton';
import { FaSearch } from 'react-icons/fa';

const KbSearchInput = ({ itemProp, titleWidthProp, codeWidthProp, nameWidthProp, heightProp, inputDatasProp }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputSearchName, setInputSearchName] = useState('');
  const [filterDatas, setFilterDatas] = useState(inputDatasProp);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRefs = useRef([]);
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const InputDataFind = (e) => {
    const inputValue = e.target.value;
    
    // 숫자인지 확인하는 정규식
    const isNumber = /^\d+$/.test(inputValue);
  
    // 한글인지 확인하는 정규식
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputValue);
  
    if (e.key === 'Enter' && inputValue !== '') {
      let result;
  
      if (isNumber) {
        // 숫자일 경우 코드로 필터링
        result = inputDatasProp.find(inputData => inputData.code.includes(inputValue));
      } else if (isKorean) {
        // 한글일 경우 이름으로 필터링
        result = inputDatasProp.find(inputData => inputData.name.includes(inputValue));
      }
  
      if (result) {
        setInputCode(result.code);
        setInputName(result.name);
      } else {
        setInputCode('');
        setInputName('');
      }
    }
  };

  const inputDataChang = (e) => {
    setInputCode(e.target.value);
  }

  const searchInputChange = (e) => {
    setInputSearchName(e.target.value);
  }

  const inputSearch = () => {
    const datas = inputDatasProp.filter(data => data.name.includes(inputSearchName));
    setFilterDatas(datas);
    setCurrentIndex(0);
  }

  const InputDataEnterKey = (e) => {
    if (e.key === 'Enter') {
      inputSearch();
    }
  }

  const selectedListEnter = (e, code, name) => {
    if (e.key === 'Enter') {
      selectedInputData(code, name);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      togglePopup();
    } else if (e.key === 'F3') {
      e.preventDefault();
      inputSearch();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentIndex((prev) => {
        if (prev > 0) {  // currentIndex가 0보다 클 때만 감소
          return prev - 1;
        }
        return prev;  // 더 이상 감소하지 않음
      });
    } else if (e.key === "ArrowDown" && filterDatas.length > 0) {
      e.preventDefault();
      setCurrentIndex((prev) => {
        if (prev < filterDatas.length - 1) {  // currentIndex가 최대 값보다 작을 때만 증가
          return prev + 1;
        }
        return prev;  // 더 이상 증가하지 않음
      });
    }
  };
  
  useEffect(() => {
    // 팝업이 열릴 때만 키보드 이벤트 리스너를 추가
    if (isPopupOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setFilterDatas(inputDatasProp);
      setCurrentIndex(0);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopupOpen]);

  // currentIndex가 변경될 때, 해당 항목으로 스크롤
  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',  // 가장 가까운 위치로 스크롤
      });
    }
  }, [currentIndex]);

  const selectedList = (index) => {
    setCurrentIndex(index);
  }
  
  const selectedInputData = (code, name) => {
    setInputCode(code);
    setInputName(name);
    togglePopup();
  }

  return (
    <div>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          height: `${heightProp}px`,
        }}
      >
        <div 
          style={{
            marginRight: '8px',
            fontWeight: 'bold',
            width: `${titleWidthProp}px`
          }}
        >
          {itemProp}
        </div>
        <input 
          type="text" 
          style={{
            border: '1px solid #ccc',
            height: `${heightProp - 2}px`,
            padding: '0px 5px',
            textAlign: 'center',
            width: `${codeWidthProp}px`
          }}
          value={inputCode} 
          // placeholder={itemProp} 
          onChange={inputDataChang} 
          onKeyDown={InputDataFind}
        />
        <div 
          onClick={togglePopup}
          style={{ 
            border: '1px solid #ccc', 
            width: `${heightProp - 2}px`, 
            height: `${heightProp - 2}px`,
            lineHeight: `${heightProp - 2}px`,
            textAlign: 'center',
            color: '#ccc', 
            backgroundColor: '#fff',
            cursor: 'pointer' 
          }}
        >
          <FaSearch style={{ paddingTop: '4px', width: '16px', height: '16px', lineHeight: '16px', color: '#666' }} />
        </div>
        <input 
          type="text"
          style={{
            border: '1px solid #ccc',
            height: `${heightProp - 2}px`,
            padding: '0px 5px',
            width: `${nameWidthProp}px`
          }}
          value={inputName} 
          disabled 
        />
      </div>

      {isPopupOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.0)',
            zIndex: '1000'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              width: '500px',
              height: '540px',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              zIndex: '2000'
            }}
          >
            <div 
              style={{
                marginLeft: '16px',
              }}
            >
              <div
                style={{
                  height: '50px',
                  lineHeight: '50px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                ★ {itemProp} 검색</div>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <input 
                  type="text" 
                  style={{
                    width: '350px',
                    height: '23px',
                    padding: '0px 5px',
                    marginRight: '5px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                  }}
                  placeholder="  검색어를 입력하세요" 
                  onChange={searchInputChange} 
                  onKeyDown={InputDataEnterKey}
                />
                <Kbbutton typeProp="searchButton" textProp={""} onClick={() => inputSearch()} />
              </div>  
            </div>
            <div>
              <div 
                style={{
                  display: 'flex',
                  width: '450px',
                  height: '25px',
                  lineHeight: '25px',
                  marginLeft: '16px',
                  backgroundColor: 'rgb(238, 238, 238)',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{
                    width: '50px',
                    border: '1px solid #ccc',
                  }}
                >
                  <div>No</div>
                </div>
                <div 
                  style={{
                    width: '150px',
                    border: '1px solid #ccc',
                  }}
                >
                  {itemProp}코드
                </div>
                <div 
                  style={{
                    width: '300px',
                    border: '1px solid #ccc',
                    padding: '0px 5px',
                  }}                
                >
                  {itemProp}명
                </div>
              </div>
              <div 
                style={{
                  width: '485px',
                  height: '375px',
                  overflowY: 'auto',
                }}                
              >
              {filterDatas.map((inputData, index) => (
                <div  key={index} 
                      ref={(el) => itemRefs.current[index] = el} // 각 항목에 대한 참조 저장
                      style={{
                        display: 'flex',
                        width: '450px',
                        height: '25px',
                        lineHeight: '25px',
                        marginLeft: '16px',
                        backgroundColor: currentIndex === index? 'rgb(174, 206, 250)' : ''
                      }}
                      onClick={() => {selectedList(index)}} 
                      onDoubleClick={() => {selectedInputData(inputData.code, inputData.name)}} 
                      onKeyDown={(e) => {selectedListEnter(e, inputData.code, inputData.name)}}
                      tabIndex={currentIndex === index ? "0" : "-1"}
                >
                  <div 
                    style={{
                      width: '50px',
                      border: '1px solid #ccc',
                      textAlign: 'center'
                    }}
                  >
                    <div>{index + 1}</div>
                  </div>
                  <div 
                    style={{
                      width: '150px',
                      border: '1px solid #ccc',
                      textAlign: 'center'
                    }}
                  >
                    {inputData.code}
                  </div>
                  <div 
                    style={{
                      width: '300px',
                      border: '1px solid #ccc',
                      padding: '0px 5px',
                    }}
                  >
                    {inputData.name}
                  </div>
                </div>
              ))}
              </div>
            </div>
            <div
              style={{
                margin: '10px 16px'
              }}
            >
              <Kbbutton type="closeButton" textProp={""} onClick={() => togglePopup()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KbSearchInput;
