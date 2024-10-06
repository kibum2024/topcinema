import React, { useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import KbSearchPopup from './KbSearchPopup';

const KbSearchButton = ({ itemProp, inputDatasProp, onClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const popUpData = (newData) => {
    onClick(newData);
    togglePopup();
  };

  return (
    <div>
      <div
        style={{
          width: '20px', 
          height: '20px', 
          lineHeight: '20px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={togglePopup}
      >
        <FaSearch style={{ paddingTop: '1px', width: '16px', height: '16px', lineHeight: '16px', color: '#aaa' }} />
      </div>

      {isPopupOpen && (
        <KbSearchPopup  itemProp = {itemProp} inputDatasProp = {inputDatasProp} onClick = {popUpData}/>
      )}  
    </div>
  );
}

export default KbSearchButton;
