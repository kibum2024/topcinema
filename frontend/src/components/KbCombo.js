import React, { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from "react-icons/io5";

const KbCombo = ({ comboDataProp, userProp, comboWidthProp, comboHeightProp, onClick }) => {
  const [selectedData, setSelectedData] = useState(comboDataProp.find(item => item.code === userProp)?.name); 
  const [isDataDropdownVisible, setIsDataDropdownVisible] = useState(false); 
  const [dropdownDataPosition, setDropdownDataPosition] = useState({ top: 0, left: 0 });
  const inputDataRef = useRef(null); 
  const dropdownDataRef = useRef(null); 

  const InputDataChange = (e) => {
    setSelectedData(e.target.value);
  };

  const selectDataChange = (comboData) => {
    setSelectedData(comboData.name);
    setIsDataDropdownVisible(false); 

    if (onClick) {
      onClick(comboData);
    }
  };

  const toggleDataDropdown = () => {
    setIsDataDropdownVisible(!isDataDropdownVisible);
    updateDropdownDataPosition();
  };

  const updateDropdownDataPosition = () => {
    if (inputDataRef.current) {
      const inputRect = inputDataRef.current.getBoundingClientRect();
      setDropdownDataPosition({
        top: inputRect.bottom,
        left: inputRect.left, 
      });
    }
  };

  const preventScroll = (e) => {
    const dropdownRefs = [dropdownDataRef];
  
    const isInAnyDropdown = dropdownRefs.some(ref => ref.current && ref.current.contains(e.target));
    const isCurrent = dropdownRefs.some(ref => ref.current && ref.current.contains(e.target));
  
    if (isInAnyDropdown) {
      const target = isCurrent.current;
      
      if (target) {
        const isScrollable = target.scrollHeight > target.clientHeight;

        if (isScrollable) {
          const atTop = target.scrollTop === 0;
          const atBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
  
          if (atTop && e.deltaY < 0) {
            e.preventDefault(); // 상단에서 더 이상 스크롤되지 않도록 차단
          }
  
          if (atBottom && e.deltaY > 0) {
            e.preventDefault(); // 하단에서 더 이상 스크롤되지 않도록 차단
          }
        } else {
          e.preventDefault();
        }
      }
    }  
  };
  
  // 드롭다운이 열릴 때와 닫힐 때 스크롤 이벤트 제어
  useEffect(() => {
    if (isDataDropdownVisible) {
      // 드롭다운이 보일 때 스크롤 방지
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });

      document.body.style.overflow = 'hidden';
    } else {
      // 드롭다운이 보이지 않을 때 스크롤 방지 해제
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);

      document.body.style.overflow = '';
    }
  
    // 컴포넌트가 언마운트될 때 스크롤 방지 해제
    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isDataDropdownVisible]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: `${comboWidthProp}px`,
          height: `${comboHeightProp}px`,
          margin: '2px 0px',
        }}
      >
        <input
          ref={inputDataRef}
          type="text"
          value={selectedData}
          onChange={InputDataChange}
          style={{
            width: `${comboWidthProp - 18}px`,
            height: `${comboHeightProp}px`,
            textAlign: 'center',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <div
          onClick={toggleDataDropdown}
          style={{ 
            border: '1px solid #ccc', 
            width: '18px', 
            height: `${comboHeightProp}px`,
            color: '#ccc', 
            backgroundColor: '#fff',
            borderRadius: '4px', 
          }}
        ><IoChevronDown size={16} style={{ paddingTop: '3px' }} /></div>
      </div>

      {/* 콤보버튼 클릭       */}
      {isDataDropdownVisible && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.0)',
            zIndex: 1000
          }}
        >
          <ul
            style={{
              position: 'absolute',
              top: `${dropdownDataPosition.top}px`, 
              left: `${dropdownDataPosition.left}px`,
              width: `${comboWidthProp}px`,
              maxHeight: '180px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              zIndex: 1,
              padding: 0,
              listStyle: 'none',
              margin: 0
            }}
            ref={dropdownDataRef}
          >
            {comboDataProp.map((comboData, index) => (
              <li
                key={index}
                onClick={() => selectDataChange(comboData)}
                style={{
                  fontSize: '14px', 
                  textAlign: 'center',
                  height: '18px',
                  lineHeight: '18px',
                  cursor: 'pointer',
                  backgroundColor: selectedData === comboData.name ? '#e6f7ff' : 'white'
                }}
              >
                {comboData.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KbCombo;