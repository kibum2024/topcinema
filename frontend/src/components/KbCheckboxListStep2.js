import React, { useState } from 'react';

const KbCheckboxListStep2 = ({ menuItems }) => {
  const [checkedCategories, setCheckedCategories] = useState([]); // 체크된 카테고리들
  const [highlightedCategory, setHighlightedCategory] = useState(null); // 하이라이트된 카테고리
  const [checkedItems, setCheckedItems] = useState([]); // 체크된 메뉴 항목
  const [allChecked, setAllChecked] = useState(false); // 모든 권한 체크 여부

  // "모든 권한"을 처리하기 위해 추가된 임의의 데이터
  const allCategory = {
    menuId: 'all',
    menuName: '모든 권한',
    menuLevel: '0', // 상위 권한을 나타내기 위한 레벨
  };

  // 좌측 메뉴 리스트 (menuLevel이 1인 항목들)
  const leftMenu = menuItems.filter((menu) => menu.menuLevel === '1');

  // 우측 메뉴 리스트 (하이라이트된 카테고리의 menuLevel이 3인 항목들)
  const rightMenu = menuItems.filter(
    (menu) => menu.menuLevel === '3' && highlightedCategory && menu.menuCode1 === highlightedCategory.menuCode1
  );

  // "모든 권한" 체크박스 선택 처리
  const handleAllCheck = () => {
    if (allChecked) {
      // "모든 권한"이 체크 해제되면 모든 체크 해제
      setCheckedCategories([]);
    } else {
      // "모든 권한"이 체크되면 모든 카테고리 체크
      setCheckedCategories(leftMenu);
    }
    setAllChecked(!allChecked); // 체크 상태 반전
  };

  // 개별 카테고리 체크박스 선택 처리
  const handleCheckboxChange = (category) => {
    setCheckedCategories((prevChecked) => {
      if (prevChecked.some((cat) => cat.menuId === category.menuId)) {
        // 이미 선택된 카테고리면 체크 해제
        return prevChecked.filter((cat) => cat.menuId !== category.menuId);
      } else {
        // 선택되지 않은 카테고리면 체크 추가
        return [...prevChecked, category];
      }
    });
  };

  // 글자 클릭 시 배경색 파란색으로 하이라이트
  const handleCategoryClick = (category) => {
    setHighlightedCategory(category); // 글자 선택 시 해당 카테고리 하이라이트
    if (!checkedCategories.some((cat) => cat.menuId === category.menuId)) {
      // 체크되지 않은 상태면 글자 클릭 시 체크도 같이 처리
      handleCheckboxChange(category);
    }
  };

  // 메뉴 체크박스 상태 변경 처리
  const handleMenuChange = (menuId) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(menuId)) {
        return prevCheckedItems.filter((id) => id !== menuId); // 체크 해제
      } else {
        return [...prevCheckedItems, menuId]; // 체크 추가
      }
    });
  };

  // 커스텀 체크박스 스타일
  const styles = {
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '10px',
    },
    checkbox: {
      width: '12px',
      height: '12px',
      border: '2px solid rgb(204, 204, 204)',
      borderRadius: '3px',
      display: 'inline-block',
      marginRight: '10px',
      position: 'relative',
    },
    checkboxChecked: {
      backgroundColor: 'rgb(0, 56, 121)',
      borderColor: 'rgb(0, 56, 121)',
    },
    checkmark: {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '3px',
      fontWeight: 'bold',
      width: '4px',
      height: '8px',
      border: 'solid white',
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
    },
    label: {
      cursor: 'pointer',
    },
    highlightedCategory: {
      backgroundColor: 'blue',
      color: 'white',
      padding: '5px',
      borderRadius: '3px',
      cursor: 'pointer',
    },
    defaultCategory: {
      backgroundColor: 'transparent',
      padding: '5px',
      borderRadius: '3px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* 좌측 카테고리 리스트 */}
      <div>
        <h3>카테고리</h3>
        {/* 모든 권한 체크박스 */}
        <div style={styles.checkboxWrapper} onClick={handleAllCheck}>
          <div
            style={{
              ...styles.checkbox,
              ...(allChecked ? styles.checkboxChecked : {}),
            }}
          >
            {allChecked && <div style={styles.checkmark}></div>}
          </div>
          <div style={styles.label}>{allCategory.menuName}</div>
        </div>

        {/* 개별 카테고리 */}
        {leftMenu.map((category) => (
          <div
            key={category.menuId}
            style={styles.checkboxWrapper}
            onClick={() => handleCheckboxChange(category)}
          >
            <div
              style={{
                ...styles.checkbox,
                ...(checkedCategories.some((cat) => cat.menuId === category.menuId)
                  ? styles.checkboxChecked
                  : {}),
              }}
            >
              {checkedCategories.some((cat) => cat.menuId === category.menuId) && (
                <div style={styles.checkmark}></div>
              )}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트가 체크박스에 전달되지 않도록
                handleCategoryClick(category);
              }}
              style={
                highlightedCategory?.menuId === category.menuId
                  ? styles.highlightedCategory
                  : styles.defaultCategory
              }
            >
              {category.menuName}
            </div>
          </div>
        ))}
      </div>

      {/* 우측 메뉴 리스트 (선택된 글자에 해당하는 menuLevel 3) */}
      <div>
        {rightMenu.length > 0 ? (
          <>
            <h3>{highlightedCategory.menuName} 메뉴 구성</h3>
            {rightMenu.map((menu) => (
              <div key={menu.menuId} style={styles.checkboxWrapper}>
                <div
                  style={{
                    ...styles.checkbox,
                    ...(checkedItems.includes(menu.menuId)
                      ? styles.checkboxChecked
                      : {}),
                  }}
                  onClick={() => handleMenuChange(menu.menuId)}
                >
                  {checkedItems.includes(menu.menuId) && (
                    <div style={styles.checkmark}></div>
                  )}
                </div>
                <div style={styles.label}>{menu.menuName}</div>
              </div>
            ))}
          </>
        ) : (
          <p>카테고리를 선택하면 메뉴가 표시됩니다</p>
        )}
      </div>
    </div>
  );
};

export default KbCheckboxListStep2;

