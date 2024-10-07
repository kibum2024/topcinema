import React, { useState, useEffect } from 'react';

const KbRadioButton = ({ itemProp, widthProp, itemDatasProp, selectedItemProp, onClick }) => {
  const [itemDatas, setItemDatas] = useState(itemDatasProp);
  const [currentIndex, setCurrentIndex] = useState(0);

  // itemDatasProp와 selectedItemProp이 변경될 때마다 실행
  useEffect(() => {
    if (itemDatasProp) {
      setItemDatas(itemDatasProp);

      if (selectedItemProp) {
        const findIndex = itemDatasProp.findIndex(item => item.common_code === selectedItemProp);

        console.log("itemDatasProp : ", itemDatasProp);
        console.log("findIndex : ", findIndex);
        console.log("selectedItemProp : ", selectedItemProp);

        if (findIndex !== -1) {
          setCurrentIndex(findIndex);
          // onClick(findIndex);
        } else {
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex(0);
      }
    }
  }, [itemDatasProp, selectedItemProp]); 

  const selectedItem = (index) => {
    setCurrentIndex(index);
    onClick(index);
  }

  return (
    <div style={{ display: 'flex', height: '25px', lineHeight: '25px' }}>
      <div
        style={{
          width: `${widthProp}px`,
          paddingRight: '5px',
        }}
      >{itemProp}</div>
      <div style={{ display: 'flex' }}>
        {itemDatas.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'auto',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => selectedItem(item.common_code)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                marginRight: '6px',
                backgroundColor: 'white',
                border: index === currentIndex ? '1px solid rgb(0, 56, 121)' : '1px solid #aaa',
                borderRadius: '50%'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: index === currentIndex ? 'rgb(0, 56, 121)' : 'white',
                  border: index === currentIndex ? '1px solid rgb(0, 56, 121)' : 'none',
                  borderRadius: '50%'
                }}
              >
              </div>
            </div>
            <div
              style={{
                marginRight: '15px',
              }}
            >
              {item.common_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KbRadioButton;