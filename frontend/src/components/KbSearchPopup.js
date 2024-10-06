import React, { useState, useEffect, useRef } from 'react';
import Kbbutton from './KbButton';

const KbSearchPopup = ({ itemProp, inputDatasProp, onClick }) => {
  const [inputSearchName, setInputSearchName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterDatas, setFilterDatas] = useState(inputDatasProp);
  const itemRefs = useRef([]);

  const inputSearch = () => {
    const datas = inputDatasProp.filter(data => data.name.includes(inputSearchName));
    setFilterDatas(datas);
    setCurrentIndex(0);
  }

  const searchInputChange = (e) => {
    setInputSearchName(e.target.value);
  }

  const InputDataEnterKey = (e) => {
    if (e.key === 'Enter') {
      inputSearch();
    }
  }

  const selectedListEnter = (e, data) => {
    if (e.key === 'Enter') {
      selectedInputData(data);
    }
  }

  const selectedInputData = (data) => {
    onClick(data);
  }

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

  return (
    <div>
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
                    onDoubleClick={() => {selectedInputData(inputData)}} 
                    onKeyDown={(e) => {selectedListEnter(e, inputData)}}
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
            <Kbbutton typeProp="closeButton" textProp={""} onClick={() => onClick()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KbSearchPopup;