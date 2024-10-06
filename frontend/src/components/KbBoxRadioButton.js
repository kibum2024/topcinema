import React, { useState } from 'react';

const KbBoxRadioButton = ({ itemProp, itemDatasProp, allCheckProp, onClick }) => {
  const [itemDatas] = useState(itemDatasProp);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedItem = (index) => {
    setCurrentIndex(index);
    onClick(index + 1);
  }

  return (
    <div style={{ display: 'flex', height: '25px', lineHeight: '25px' }}>
      <div
        style={{
          width: 'auto',
          padding: '0px 10px',
        }}
      >{itemProp}</div>
      {allCheckProp && (
        <div
          style={{
            width: 'auto',
            border: '1px solid rgb(0, 56, 121)',
            padding: '0px 10px',
            borderRadius: '6px 0px 0px 6px',
            backgroundColor: -1 === currentIndex ? 'rgb(0, 56, 121)' : 'white',
            color: -1 === currentIndex ? 'white' : 'black'
        }}
          onClick={() => selectedItem(-1)}
        >
          전체</div>
      )}
      <div style={{ display: 'flex' }}>
        {itemDatas.map((item, index) => (
          <div
            key={index}
            style={{
              width: 'auto',
              border: '1px solid rgb(0, 56, 121)',
              padding: '0px 10px',
              borderRadius: index === 0 && !allCheckProp ? '6px 0px 0px 6px' : (index === itemDatas.length - 1 ? '0px 6px 6px 0px' : '0px'),
              backgroundColor: index === currentIndex ? 'rgb(0, 56, 121)' : 'white',
              color: index === currentIndex ? 'white' : 'black'
            }}
            onClick={() => selectedItem(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KbBoxRadioButton;