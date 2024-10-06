import React, { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoPencil, IoSearch, IoCloseCircleOutline, IoRefresh } from 'react-icons/io5';
import { RiFileExcel2Line } from 'react-icons/ri';

// 아이콘 및 색상/스타일 매핑
const iconMap = {
  '삭제': {
    icon: IoRemoveCircleOutline,
    color: 'red',
    backgroundColor: 'white',
    border: '1px solid red',
    hover: {
      color: 'white',
      backgroundColor: 'red',
    }
  },
  '추가': {
    icon: IoAddCircleOutline,
    color: 'rgb(0, 56, 121)',
    backgroundColor: 'white',
    border: '1px solid rgb(0, 56, 121)',
    hover: {
      color: 'white',
      backgroundColor: 'rgb(0, 56, 121)',
    }
  },
  '수정': {
    icon: IoPencil,
    color: 'green',
    backgroundColor: 'white',
    border: '1px solid green',
    hover: {
      color: 'white',
      backgroundColor: 'green',
    }
  },
  '검색': {
    icon: IoSearch,
    color: '#666666',
    backgroundColor: 'white',
    border: '1px solid rgb(204, 204, 204)',
    hover: {
      color: 'white',
      backgroundColor: '#666666',
    }
  },
  '닫기': {
    icon: IoCloseCircleOutline,
    color: '#666666',
    backgroundColor: 'white',
    border: '1px solid rgb(204, 204, 204)',
    hover: {
      color: 'white',
      backgroundColor: '#666666',
    }
  },
  '초기화': {
    icon: IoRefresh,
    color: '#666666',
    backgroundColor: 'white',
    border: '1px solid rgb(204, 204, 204)',
    hover: {
      color: 'white',
      backgroundColor: '#666666',
    }
  },
  '엑셀': {
    icon: RiFileExcel2Line,
    color: 'green',
    backgroundColor: 'white',
    border: '1px solid green',
    hover: {
      color: 'white',
      backgroundColor: 'green',
    }
  }
};

// KbButton 컴포넌트
const KbButton = ({ textProp, iconProp, onClick }) => {
  // 기본 버튼 스타일 설정
  const defaultButtonConfig = {
    width: ' fit-content',
    height: '25px',
    iconWidth: '16px',
    iconHeight: '16px',
    backgroundColor: 'white',
    borderRadius: '6px',
    color: '#666666',
  };

  const [isHovered, setIsHovered] = useState(false);  // hover 상태 관리

  // iconProp에 따라 iconMap에서 아이콘 및 스타일 정보 가져오기
  const iconConfig = iconMap[iconProp] || {};
  const IconComponent = iconConfig.icon;

  // 기본 config와 iconConfig 병합
  const buttonStyle = {
    ...defaultButtonConfig,  // 기본 설정
    border: iconConfig.border || defaultButtonConfig.border,
    backgroundColor: isHovered ? (iconConfig.hover?.backgroundColor || defaultButtonConfig.backgroundColor) : defaultButtonConfig.backgroundColor,
    color: isHovered ? (iconConfig.hover?.color || defaultButtonConfig.color) : defaultButtonConfig.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 10px',
    userSelect: 'none',
  };

  return (
    <div>
      <div 
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}  // 마우스가 버튼 위로 갈 때
        onMouseLeave={() => setIsHovered(false)}  // 마우스가 버튼을 벗어날 때
      >
        <div  
          style={{ 
            width: defaultButtonConfig.iconWidth, 
            height: defaultButtonConfig.iconHeight,
            lineHeight: defaultButtonConfig.iconHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 전달받은 아이콘을 렌더링 */}
          {IconComponent && <IconComponent size={18} color={isHovered ? (iconConfig.hover?.color || defaultButtonConfig.color) : iconConfig.color}/>}
        </div>
        &nbsp;
        <div
          style={{ 
            height: defaultButtonConfig.iconHeight,
            lineHeight: defaultButtonConfig.iconHeight,
            color: isHovered ? (iconConfig.hover?.color || defaultButtonConfig.color) : iconConfig.color,
          }}
        >
          {textProp || iconProp}  {/* 텍스트가 없으면 iconProp을 기본값으로 사용 */}
        </div>
      </div>
    </div>
  );
};

export default KbButton;
