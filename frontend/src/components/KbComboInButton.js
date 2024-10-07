import React, { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from "react-icons/io5";

const KbComboInButton = ({ comboDataProp, userProp, comboWidthProp, comboHeightProp, onClick }) => {
  const [selectedData, setSelectedData] = useState("");
  const [isDataDropdownVisible, setIsDataDropdownVisible] = useState(false);
  const [dropdownDataPosition, setDropdownDataPosition] = useState({ top: 0, left: 0 });
  const [dropdownWidth, setDropdownWidth] = useState(comboWidthProp + 9);
  const inputDataRef = useRef(null);
  const dropdownDataRef = useRef(null);


  useEffect(() => {
    if (comboDataProp) {

      if (userProp) {
        const findCode = comboDataProp.find(item => item.common_code === userProp);

        if (findCode) {
          setSelectedData(findCode.common_name);
        } else {
          setSelectedData("ALL");
        }
      } else {
        setSelectedData("ALL");
      }
    }
  }, [comboDataProp, userProp]);


  const InputDataChange = (e) => {
    setSelectedData(e.target.value);
  };

  const selectDataChange = (comboData) => {
    setSelectedData(comboData.common_name);
    setIsDataDropdownVisible(false);

    if (onClick) {
      onClick(comboData.common_code);
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

  const adjustDropdownWidth = () => {
    if (dropdownDataRef.current) {
      const dropdown = dropdownDataRef.current;
      const isScrollable = dropdown.scrollHeight > dropdown.clientHeight;
      if (isScrollable) {
        setDropdownWidth(comboWidthProp + 15 - 0); // 스크롤바가 생기면 17px 줄여서 스크롤바 너비를 고려
      } else {
        setDropdownWidth(comboWidthProp + 15); // 스크롤바가 없으면 원래 너비
      }
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

      adjustDropdownWidth(); // 드롭다운이 보일 때 스크롤바 여부에 따라 너비 조정
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
          position: 'relative',
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
            width: `${comboWidthProp}px`,
            height: `${comboHeightProp}px`,
            lineHeight: `${comboHeightProp}px`,
            textAlign: 'left',
            border: '1px solid #ccc',
            paddingLeft: '10px',
          }}
        />
        <div
          onClick={toggleDataDropdown}
          style={{
            position: 'absolute',
            top: '1px',
            right: '1px',
            border: 'none',
            width: '18px',
            height: `${comboHeightProp - 4}px`,
            color: '#ccc',
            backgroundColor: '#fff',
            borderRadius: '0px 6px 6px 0px',
          }}
        ><IoChevronDown size={16} style={{ paddingTop: '0px' }} /></div>
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
          {/* {console.log("comboDataProp : ", comboDataProp)} */}
          <ul
            style={{
              position: 'absolute',
              top: `${dropdownDataPosition.top}px`,
              left: `${dropdownDataPosition.left}px`,
              width: `${dropdownWidth}px`, // 스크롤 여부에 따라 width 조정
              maxHeight: '180px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              zIndex: 1,
              padding: 0,
              listStyle: 'none',
              borderRadius: '6px',
              margin: 0
            }}
            ref={dropdownDataRef}
          >
            {comboDataProp.map((comboData, index) => (
              <li
                key={index}
                onClick={() => selectDataChange(comboData)}
                style={{
                  textAlign: 'left',
                  height: '18px',
                  lineHeight: '18px',
                  cursor: 'pointer',
                  paddingLeft: '10px',
                  backgroundColor: selectedData === comboData.common_name ? '#e6f7ff' : 'white'
                }}
              >
                {comboData.common_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KbComboInButton;
