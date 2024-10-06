import React, { useState, useEffect } from 'react';

const KbRadioButton = ({ itemProp, widthProp, itemDatasProp, selectedItemProp, onClick }) => {
  const [itemDatas, setItemDatas] = useState(itemDatasProp);
  const [currentIndex, setCurrentIndex] = useState(0);

  // itemDatasProp와 selectedItemProp이 변경될 때마다 실행
  useEffect(() => {
    if (itemDatasProp) {
      // itemDatas 상태값을 갱신
      setItemDatas(itemDatasProp);

      if (selectedItemProp) {
        // selectedItemProp 값에 해당하는 인덱스 찾기
        const findIndex = itemDatasProp.findIndex(item => item.common_code === selectedItemProp);

        // 인덱스가 존재하면 해당 인덱스로 설정, 없으면 0으로 설정
        if (findIndex !== -1) {
          setCurrentIndex(findIndex);
        } else {
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex(0);
      }
    }
  }, [itemDatasProp, selectedItemProp]); // 의존성 배열에 추가

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