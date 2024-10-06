import React, { useState, useEffect } from 'react';

const KbCheckboxListStep3 = ({ menuItems, onCheckedMenuIdsChange }) => {
  const [checkedCategories, setCheckedCategories] = useState([]); // 체크된 카테고리들 (menuLevel 1)
  const [highlightedCategory, setHighlightedCategory] = useState(""); // 하이라이트된 카테고리 (menuLevel 1)
  const [selectedSubCategory, setSelectedSubCategory] = useState([]); // 선택된 중앙의 메뉴 (menuLevel 2)
  const [checkedItems, setCheckedItems] = useState([]); // 체크된 메뉴 항목 (menuLevel 3)
  const [allChecked, setAllChecked] = useState(false); // 모든 권한 체크 여부

  // "모든 권한"을 처리하기 위해 추가된 임의의 데이터
  const allCategory = {
    menuId: 'all',
    menuName: '모든 권한',
    menuLevel: '0', // 상위 권한을 나타내기 위한 레벨
  };

  // 좌측 메뉴 리스트 (menuLevel이 1인 항목들)
  const leftMenu = menuItems.filter((menu) => menu.menuLevel === '1');

  // 중앙 메뉴 리스트 (선택된 좌측 카테고리의 menuLevel이 2인 항목들)
  const middleMenu = menuItems.filter(
    (menu) =>
      menu.menuLevel === '2' &&
      highlightedCategory &&
      menu.menuCode1 === highlightedCategory.menuCode1
  );

  // 우측 메뉴 리스트 (선택된 좌측 카테고리와 관련된 menuLevel 3인 항목들)
  const rightMenu = menuItems.filter(
    (menu) =>
      menu.menuLevel === '3' &&
      highlightedCategory &&
      menu.menuCode1 === highlightedCategory.menuCode1 &&
      selectedSubCategory.some(
        (subCategory) =>
          menu.menuCode1 === subCategory.menuCode1 &&
          menu.menuCode2 === subCategory.menuCode2
      )
  );

  // "모든 권한" 체크박스 선택 처리
  const handleAllCheck = () => {
    if (allChecked) {
      // "모든 권한"이 체크 해제되면 모든 체크 해제
      setCheckedCategories([]);
      setSelectedSubCategory([]);
      setCheckedItems([]);
      setHighlightedCategory("");
    } else {
      // 모든 권한이 체크되면 모든 항목을 체크하고 첫 번째 카테고리를 클릭한 것처럼 처리
      setCheckedCategories(leftMenu); // 좌측 모든 항목 선택
      const firstCategory = leftMenu[0]; // 좌측 첫 번째 항목
      handleCategoryClick(firstCategory, true); // 첫 번째 항목을 클릭한 것처럼 처리
    }
    setAllChecked(!allChecked); // 체크 상태 반전
  };

  // 상위 메뉴 체크 시 해당하는 중앙 및 우측 하위 메뉴를 체크
  const handleCheckboxChange = (category) => {
    const subCategories = menuItems.filter(
      (menu) => menu.menuLevel === '2' && menu.menuCode1 === category.menuCode1
    );
    const items = menuItems.filter(
      (menu) => menu.menuLevel === '3' && menu.menuCode1 === category.menuCode1
    );

    if (checkedCategories.some((cat) => cat.menuId === category.menuId)) {
      // 카테고리가 이미 체크되어 있다면, 해제 시 관련 하위 항목도 해제
      setCheckedCategories((prev) => prev.filter((cat) => cat.menuId !== category.menuId));
      setSelectedSubCategory((prev) =>
        prev.filter((subCategory) => subCategory.menuCode1 !== category.menuCode1)
      );
      setCheckedItems((prev) =>
        prev.filter((itemId) => !items.some((item) => item.menuId === itemId))
      );
    } else {
      // 상위 메뉴 체크 시 해당하는 중앙 메뉴와 하위 메뉴도 모두 체크
      setCheckedCategories((prev) => [...prev, category]);
      setSelectedSubCategory((prev) => [...prev, ...subCategories]);
      setCheckedItems((prev) => [...prev, ...items.map((item) => item.menuId)]);
    }
    setHighlightedCategory(category); // 해당 카테고리를 하이라이트
  };

  // 글자 클릭 시 배경색 파란색으로 하이라이트 (menuLevel 1)
  const handleCategoryClick = (category, forceCheck = false) => {
    setHighlightedCategory(category); // 글자 선택 시 해당 카테고리 하이라이트
    console.log("category :", category);

    // 만약 "모든 권한"이 선택된 상태라면, 중앙과 우측 메뉴를 모두 체크
    if (allChecked || forceCheck) {
      const subCategories = menuItems.filter(
        (menu) => menu.menuLevel === '2' && menu.menuCode1 === category.menuCode1
      );
      const items = menuItems.filter(
        (menu) => menu.menuLevel === '3' && menu.menuCode1 === category.menuCode1
      );
      setSelectedSubCategory(subCategories); // 해당 카테고리의 모든 중앙 메뉴 선택
      setCheckedItems(items.map((item) => item.menuId)); // 해당 카테고리의 모든 하위 메뉴 선택
    }

    // 체크된 상태에서는 체크를 해제하지 않고 중앙, 우측 메뉴 상태 유지
    if (!checkedCategories.some((cat) => cat.menuId === category.menuId)) {
      handleCheckboxChange(category); // 체크되지 않은 경우만 체크 처리
    }
  };

  // 중앙 메뉴 체크박스 클릭 처리 (menuLevel 2)
  const handleSubCategoryChange = (subCategory) => {
    const items = menuItems.filter(
      (menu) => menu.menuLevel === '3' && menu.menuCode1 === subCategory.menuCode1 && menu.menuCode2 === subCategory.menuCode2
    );

    if (selectedSubCategory.some((cat) => cat.menuId === subCategory.menuId)) {
      // 이미 선택된 중앙 카테고리 해제 시 관련 세부 메뉴도 해제
      setSelectedSubCategory((prevSubCategories) =>
        prevSubCategories.filter((cat) => cat.menuId !== subCategory.menuId)
      );
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((itemId) => !items.some((item) => item.menuId === itemId))
      );
    } else {
      // 선택되지 않은 중앙 카테고리 체크 시 관련 세부 메뉴도 체크
      setSelectedSubCategory((prevSubCategories) => [...prevSubCategories, subCategory]);
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, ...items.map((item) => item.menuId)]);
    }
  };

  // 하위 메뉴 체크 상태 변경 시 중앙 메뉴 및 좌측 메뉴 체크 상태 업데이트
  const handleMenuChange = (menuId) => {
    setCheckedItems((prevCheckedItems) => {
      let newCheckedItems;
      if (prevCheckedItems.includes(menuId)) {
        newCheckedItems = prevCheckedItems.filter((id) => id !== menuId); // 체크 해제
      } else {
        newCheckedItems = [...prevCheckedItems, menuId]; // 체크 추가
      }

      // 하위 메뉴가 모두 체크되었는지 확인하여 중앙 메뉴 체크 상태 업데이트
      updateSubCategoryCheck(newCheckedItems);
      return newCheckedItems;
    });
  };

  // 하위 메뉴가 모두 체크되었는지 확인하고 중앙 메뉴 상태 업데이트
  const updateSubCategoryCheck = (newCheckedItems) => {
    const subCategories = selectedSubCategory.map((subCategory) => {
      const items = menuItems.filter(
        (menu) =>
          menu.menuLevel === '3' &&
          menu.menuCode1 === subCategory.menuCode1 &&
          menu.menuCode2 === subCategory.menuCode2
      );

      const allChecked = items.every((item) => newCheckedItems.includes(item.menuId));
      return { ...subCategory, isChecked: allChecked };
    });

    setSelectedSubCategory(subCategories);

    // 모든 중앙 메뉴가 체크되었는지 확인하여 좌측 메뉴 상태 업데이트
    const allMiddleChecked = subCategories.every((subCategory) => subCategory.isChecked);
    if (allMiddleChecked && highlightedCategory) {
      handleCheckboxChange(highlightedCategory);
    }
  };

  // 커스텀 체크박스 스타일
  const styles = {
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '2px',
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
      padding: '1px 5px',
      cursor: 'pointer',
    },
    highlightedCategory: {
      backgroundColor: 'rgb(227, 235, 253)',
      color: '#666666',
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

  // 부모에게 체크된 항목 전달
  useEffect(() => {
    const checkedMenuIds = [
      ...checkedCategories.map((category) => category.menuId),
      ...selectedSubCategory.map((subCategory) => subCategory.menuId),
      ...checkedItems,
    ];
    onCheckedMenuIdsChange(checkedMenuIds); // 부모에게 체크된 menuId 전달
  }, [checkedCategories, selectedSubCategory, checkedItems, onCheckedMenuIdsChange]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* 좌측 카테고리 리스트 (menuLevel 1) */}
      <div
        style={{
          width: '120px',
          height: '220px',
          padding: '20px',
          marginLeft: '20px',
          borderRadius: '6px',
          border: '1px solid rgb(236, 239, 243)',
        }}
      >
        {/* <h3>카테고리</h3> */}
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

        {/* 개별 카테고리 (menuLevel 1) */}
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

      {/* 중앙 메뉴 리스트 (menuLevel 2) */}
      <div
        style={{
          width: '120px',
          height: '220px',
          padding: '20px',
          // marginLeft: '20px',
          borderRadius: '6px',
          border: '1px solid rgb(236, 239, 243)',
        }}
      >
        <div style={{ fontWeight:'bold', color: 'rgb(0, 56, 121)', marginBottom: '5px',}}>{highlightedCategory.menuName} 중분류</div>
        {middleMenu.length > 0 ? (
          <>
            {middleMenu.map((subCategory) => (
              <div
                key={subCategory.menuId}
                style={styles.checkboxWrapper}
                onClick={() => handleSubCategoryChange(subCategory)}
              >
                <div
                  style={{
                    ...styles.checkbox,
                    ...(selectedSubCategory.some(
                      (cat) => cat.menuId === subCategory.menuId
                    )
                      ? styles.checkboxChecked
                      : {}),
                  }}
                >
                  {selectedSubCategory.some(
                    (cat) => cat.menuId === subCategory.menuId
                  ) && <div style={styles.checkmark}></div>}
                </div>
                <div style={styles.defaultCategory}>
                {/* <div style={styles.label}> */}
                  {subCategory.menuName}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p></p>
        )}
      </div>

      {/* 우측 메뉴 리스트 (선택된 좌측 카테고리의 menuLevel 3 메뉴들) */}
      <div
        style={{
          width: '225px',
          height: '220px',
          padding: '20px',
          // marginLeft: '20px',
          borderRadius: '6px',
          border: '1px solid rgb(236, 239, 243)',
        }}
      >
        <div style={{ fontWeight:'bold', color: 'rgb(0, 56, 121)', marginBottom: '5px',}}>{highlightedCategory.menuName} 메뉴구성</div>
        {rightMenu.length > 0 ? (
          <>
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
          <p></p>
        )}
      </div>
    </div>
  );
};

export default KbCheckboxListStep3;
