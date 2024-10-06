import React, { useState } from 'react';
import { IoCaretBack, IoCaretForward, IoClose } from "react-icons/io5";
import './KbCalendar.css';

// 대한민국 국경일 및 설날과 추석 (2024년 기준)
const holidays = [
  { month: 1, day: 1, name: '신정' },
  { month: 2, day: 10, name: '설날' },      // 설날 (2024년 양력 2월 10일)
  { month: 2, day: 11, name: '설날 연휴' }, // 설날 연휴
  { month: 2, day: 12, name: '설날 연휴' }, // 설날 연휴
  { month: 3, day: 1, name: '삼일절' },
  { month: 5, day: 5, name: '어린이날' },
  { month: 6, day: 6, name: '현충일' },
  { month: 9, day: 16, name: '추석 연휴' }, // 추석 연휴 (2024년 양력 9월 16일)
  { month: 9, day: 17, name: '추석' },      // 추석 (2024년 양력 9월 17일)
  { month: 9, day: 18, name: '추석 연휴' }, // 추석 연휴
  { month: 8, day: 15, name: '광복절' },
  { month: 10, day: 3, name: '개천절' },
  { month: 10, day: 9, name: '한글날' },
  { month: 12, day: 25, name: '크리스마스' }
];

const KbCalendar = ({ onDateDoubleClick }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const toYear = currentDate.getFullYear();
  const toMonth = currentDate.getMonth(); 
  const toDate = currentDate.getDate(); 
  const firstDayOfMonth = new Date(toYear, toMonth, 1).getDay();
  const daysInMonth = new Date(toYear, toMonth + 1, 0).getDate();
  const [selectedDate, setSelectedDate] = useState(toDate);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(toYear, toMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(toYear, toMonth + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day); 
  };

  const handleToday = () => {
    setCurrentDate(today);
    setSelectedDate(today.getDate()); 
  };

  // 국경일 여부를 확인하는 함수
  const isHoliday = (day) => {
    return holidays.some(holiday => holiday.month === toMonth + 1 && holiday.day === day);
  };

  const handleDoubleClick = (day) => {
    if (onDateDoubleClick) {
      const date = new Date(toYear, toMonth, day);
      onDateDoubleClick(date); 
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`kb-empty-${i}`} className="kb-empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(toYear, toMonth, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 일요일(0) 또는 토요일(6)
      const holidayClass = isHoliday(day) ? 'kb-holiday' : '';
      const weekendClass = isWeekend ? 'kb-weekend' : '';
      const selectedClass = day === selectedDate ? 'kb-selected' : ''; 
      days.push(
        <div  key={day} 
              className={`kb-day ${holidayClass} ${weekendClass} ${selectedClass}`} 
              onClick={() => handleDateClick(day)} 
              onDoubleClick={() => handleDoubleClick(day)}
              // style={{ width: '14px', height: '14px', lineHeight: '14px', textAlign: 'right' }}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="kb-calendar">
      <div className='kb-calendar-close' onClick={() => handleDoubleClick(selectedDate)} ><IoClose style={{ width: '16px', height: '16px', lineHeight: '16px' }}/></div>
      <div className="kb-header">
        <button onClick={handlePrevMonth}><IoCaretBack size={16} /></button>
        <div style={{  paddingTop: '4px', fontWeight: 'bold' }}>
          {toYear}년 {toMonth + 1}월
        </div>
        <button onClick={handleNextMonth}><IoCaretForward size={16} /></button>
      </div>
      <button onClick={handleToday} className="kb-today-btn">오늘</button>
      <div className="kb-daysOfWeek" style={{ height: '18px', lineHeight: '18px' }}>
        {daysOfWeek.map((day) => (
          <div key={day} className="kb-dayOfWeek" style={{ width: '14px', height: '14px', lineHeight: '14px', textAlign: 'center' }}>
            {day}
          </div>
        ))}
      </div>
      <div className="kb-days">{renderDays()}</div>
    </div>
  );
};

export default KbCalendar;
