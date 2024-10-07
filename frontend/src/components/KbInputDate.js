import React, { useState, useEffect, useRef } from 'react';
import KbCalendar from './KbCalendar';
import { IoChevronDown, IoCalendarOutline } from "react-icons/io5";

const KbInputDate = ({ dateProp, onChange }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
  const [isMonthDropdownVisible, setIsMonthDropdownVisible] = useState(false);
  const [dropdownYearPosition, setDropdownYearPosition] = useState({ top: 0, left: 0 });
  const [dropdownMonthPosition, setDropdownMonthPosition] = useState({ top: 0, left: 0 });
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const [isCalendarOpen, setIsCallendarOpen] = useState(false);
  const dropdownYearRef = useRef(null);
  const dropdownMonthRef = useRef(null);
  const dropdownCalendarRef = useRef(null);
  const inputYearRef = useRef(null);
  const inputMonthRef = useRef(null);
  const inputDateRef = useRef(null);
  const CalendarRef = useRef(null);
  const years = Array.from({ length: 141 }, (_, i) => selectedYear - 100 + i);
  years.sort((a, b) => b - a);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  useEffect(() => {
      let year = dateProp.slice(0, 4);
      let month = dateProp.slice(4, 6);
      let day = dateProp.slice(6, 8);
      let formattedDate = new Date(year, month - 1, day);
      setSelectedYear(formattedDate.getFullYear());
      setSelectedMonth(String(formattedDate.getMonth() + 1).padStart(2, '0'));
      setSelectedDate(String(formattedDate.getDate()).padStart(2, '0'));
      onChange(selectedYear, selectedMonth, selectedDate);
  }, [dateProp]);


  // 입력 필드 변경 시 처리
  const handleInputYearChange = (e) => {
    setSelectedYear(e.target.value);
    onChange(selectedYear, selectedMonth, selectedDate);
  };

  // 드롭다운에서 연도 선택 시 처리
  const handleSelectYearChange = (year) => {
    setSelectedYear(year);
    setIsYearDropdownVisible(false); // 선택 후 드롭다운 숨기기
  };

  // 입력 필드 클릭 시 드롭다운 표시
  const toggleYearDropdown = () => {
    setIsYearDropdownVisible(!isYearDropdownVisible);
    updateDropdownYearPosition();
  };

  const updateDropdownYearPosition = () => {
    if (inputYearRef.current) {
      const inputRect = inputYearRef.current.getBoundingClientRect();
      setDropdownYearPosition({
        top: inputRect.bottom, // input 바로 아래
        left: inputRect.left, // input의 왼쪽 정렬
      });
    }
  };

  useEffect(() => {
    if (dropdownYearRef.current) {
      const selectedYearIndex = years.indexOf(selectedYear);
      const itemHeight = 18; // 예상되는 li 요소의 높이 (px 단위로 조절 필요)
      dropdownYearRef.current.scrollTop = selectedYearIndex * itemHeight;
    }
  }, [years]);

  // 여기서 부터 월 입력 필드 변경 시 처리
  const handleInputMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    onChange(selectedYear, selectedMonth, selectedDate);
  };

  const handleInputMonthBlur = (e) => {
    // 입력 값이 1자리 숫자면 2자리로 변환 (1 -> 01)
    if (e.target.value.length === 1) {
      setSelectedMonth(`0${e.target.value}`);
    }

    if (e.target.value < 1 || e.target.value > 12) {
      alert('월은 01과 12 사이의 값을 입력하세요.');
      setSelectedMonth(1);
      inputMonthRef.current.focus();
    }
  };

  // 드롭다운에서 연도 선택 시 처리
  const handleSelectMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownVisible(false); // 선택 후 드롭다운 숨기기
  };

  // 입력 필드 클릭 시 드롭다운 표시
  const toggleMonthDropdown = () => {
    setIsMonthDropdownVisible(!isYearDropdownVisible);
    updateDropdownMonthPosition();
  };

  const updateDropdownMonthPosition = () => {
    if (inputMonthRef.current) {
      const inputRect = inputMonthRef.current.getBoundingClientRect();
      setDropdownMonthPosition({
        top: inputRect.bottom, // input 바로 아래
        left: inputRect.left // input의 왼쪽 정렬
      });
    }
  };

  useEffect(() => {
    if (dropdownMonthRef.current) {
      const selectedMonthIndex = years.indexOf(selectedMonth);
      const itemHeight = 18; // 예상되는 li 요소의 높이 (px 단위로 조절 필요)
      dropdownMonthRef.current.scrollTop = selectedMonthIndex * itemHeight;
    }
  }, [months]);

  const handleInputDateChange = (e) => {
    setSelectedDate(e.target.value);
    onChange(selectedYear, selectedMonth, selectedDate);
  };

  const handleInputDateBlur = (e) => {
    // 입력 값이 1자리 숫자면 2자리로 변환 (1 -> 01)
    if (e.target.value.length === 1) {
      setSelectedDate(`0${e.target.value}`);
    }

    if (e.target.value < 1 || e.target.value > 31) {
      alert('월은 01과 31 사이의 값을 입력하세요.');
      setSelectedDate(1);
      inputDateRef.current.focus();
    }
  };

  const handleCalendarClick = () => {
    setIsCallendarOpen(!isCalendarOpen);
    updateCalendarPosition();
  };

  const updateCalendarPosition = () => {
    if (CalendarRef.current) {
      const inputRect = CalendarRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: inputRect.bottom + 5, // input 바로 아래
        left: inputRect.left - 182 // input의 왼쪽 정렬
      });
    }
  };

  const handleDateSelect = (date) => {
    setSelectedYear(date.getFullYear());
    setSelectedMonth(String(date.getMonth() + 1).padStart(2, '0'));
    setSelectedDate(String(date.getDate()).padStart(2, '0'));
    onChange(selectedYear, selectedMonth, selectedDate);
    setIsCallendarOpen(!isCalendarOpen);
  };

  const preventScroll = (e) => {
    // 드롭다운들이 포함된 ref 배열
    const dropdownRefs = [dropdownYearRef, dropdownMonthRef, dropdownCalendarRef];

    // 대상 중 하나라도 이벤트 타겟을 포함하는지 확인
    const isInAnyDropdown = dropdownRefs.some(ref => ref.current && ref.current.contains(e.target));

    if (isInAnyDropdown) {
      const target = e.target;
      const isScrollable = target.scrollHeight > target.clientHeight;

      if (isScrollable) {
        const atTop = target.scrollTop === 0;
        const atBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

        // 스크롤이 상단에 도달했고, 사용자가 위로 스크롤하려고 할 때
        if (atTop && e.deltaY < 0) {
          e.preventDefault(); // 상단에서 더 이상 스크롤되지 않도록 차단
        }

        // 스크롤이 하단에 도달했고, 사용자가 아래로 스크롤하려고 할 때
        if (atBottom && e.deltaY > 0) {
          e.preventDefault(); // 하단에서 더 이상 스크롤되지 않도록 차단
        }
      }
    } else {
      // 드롭다운 외부에서 발생한 스크롤은 차단
      e.preventDefault();
    }
  };

  useEffect(() => {
    // 어느 하나의 드롭다운이라도 열려 있으면 스크롤 차단
    if (isMonthDropdownVisible || isYearDropdownVisible || isCalendarOpen) {
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.body.style.overflow = 'hidden';
    } else {
      // 모든 드롭다운이 닫혀 있으면 스크롤 방지 해제
      document.removeEventListener('wheel', preventScroll);
      document.body.style.overflow = '';
    }

    // 컴포넌트 언마운트 시에도 스크롤 방지를 해제
    return () => {
      document.removeEventListener('wheel', preventScroll);
    };
  }, [isMonthDropdownVisible, isYearDropdownVisible, isCalendarOpen]);

  return (
    <div style={{ position: 'relative', display: 'flex', width: '200px', height: '25px' }}>
      <input
        ref={inputYearRef}
        type="text"
        value={selectedYear}
        onChange={handleInputYearChange}
        maxLength={4}
        style={{
          padding: '5px',
          width: '45px',
          textAlign: 'center',
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
      <div
        onClick={toggleYearDropdown}
        style={{ border: '1px solid #ccc', width: '18px', color: '#ccc', backgroundColor: '#fff', borderRadius: '4px' }}
      ><IoChevronDown style={{ paddingTop: '0px', width: '16px', height: '16px', lineHeight: '16px' }} /></div>
      <div style={{ height: '25px', lineHeight: '25px' }}>&nbsp;/&nbsp;</div>
      <input
        ref={inputMonthRef}
        type="text"
        value={selectedMonth}
        onChange={handleInputMonthChange}
        onBlur={handleInputMonthBlur}
        min={1}
        max={12}
        maxLength={2}
        style={{
          padding: '5px',
          width: '27px',
          textAlign: 'center',
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
      <div
        onClick={toggleMonthDropdown}
        style={{ border: '1px solid #ccc', width: '18px', color: '#ccc', backgroundColor: '#fff', borderRadius: '4px' }}
      ><IoChevronDown style={{ paddingTop: '0px', width: '16px', height: '16px', lineHeight: '16px' }} />
      </div>
      <div style={{ height: '25px', lineHeight: '25px' }}>&nbsp;/&nbsp;</div>
      <input
        ref={inputDateRef}
        type="text"
        value={selectedDate}
        onChange={handleInputDateChange}
        onBlur={handleInputDateBlur}
        min={1}
        max={31}
        maxLength={2}
        style={{
          padding: '5px',
          width: '27px',
          textAlign: 'center',
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
      <button type="button"
        ref={CalendarRef}
        style={{ width: '25px', height: '25px', border: 'none', padding: '0px', backgroundColor: 'white' }}
        onClick={handleCalendarClick}>
        <IoCalendarOutline style={{ width: '25px', height: '25px', color: 'rgb(0, 56, 121)', padding: '0px', cursor: 'pointer' }} />
      </button>

      {isCalendarOpen && (
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
          <div
            style={{
              position: 'absolute',
              top: `${calendarPosition.top}px`,
              left: `${calendarPosition.left}px`,
            }}
            ref={dropdownCalendarRef}
          >
            <KbCalendar onDateDoubleClick={handleDateSelect} />
          </div>
        </div>
      )}

      {/* 년도 드롭다운 메뉴 */}
      {isYearDropdownVisible && (
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
              top: `${dropdownYearPosition.top}px`,
              left: `${dropdownYearPosition.left}px`,
              width: '68px',
              maxHeight: '180px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              zIndex: 1,
              padding: 0,
              listStyle: 'none',
              margin: 0
            }}
            ref={dropdownYearRef}
          >
            {years.map((year) => (
              <li
                key={year}
                onClick={() => handleSelectYearChange(year)}
                style={{
                  fontSize: '14px',
                  textAlign: 'center',
                  height: '18px',
                  cursor: 'pointer',
                  backgroundColor: selectedYear === year ? '#e6f7ff' : 'white'
                }}
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 월 드롭다운 메뉴 */}
      {isMonthDropdownVisible && (
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
              top: `${dropdownMonthPosition.top}px`,
              left: `${dropdownMonthPosition.left}px`,
              width: '48px',
              maxHeight: '180px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              zIndex: 1,
              padding: 0,
              listStyle: 'none',
              margin: 0
            }}
            ref={dropdownMonthRef}
          >
            {months.map((month) => (
              <li
                key={month}
                onClick={() => handleSelectMonthChange(month)}
                style={{
                  fontSize: '14px',
                  textAlign: 'center',
                  height: '18px',
                  cursor: 'pointer',
                  backgroundColor: selectedMonth === month ? '#e6f7ff' : 'white'
                }}
              >
                {month}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default KbInputDate;
