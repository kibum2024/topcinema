import React, { useState, useEffect } from 'react';

const KbCheckboxList = ({ items, allCheckLabel, onCheckedItemsChange }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  // 모든 체크 항목이 들어간 배열 생성
  const allItems = [{ id: 'all', name: allCheckLabel }, ...items];

  const handleCheckboxChange = (itemId) => {
    if (itemId === 'all') {
      handleAllCheckedChange();
    } else {
      setCheckedItems((prevCheckedItems) => {
        const isChecked = prevCheckedItems.includes(itemId);
        if (isChecked) {
          return prevCheckedItems.filter((id) => id !== itemId);
        } else {
          return [...prevCheckedItems, itemId];
        }
      });
    }
  };

  const handleAllCheckedChange = () => {
    if (allChecked) {
      setCheckedItems([]); // 모두 해제
    } else {
      const allItemIds = items.map((item) => item.id);
      setCheckedItems(allItemIds); // 모두 선택
    }
    setAllChecked(!allChecked);
  };

  useEffect(() => {
    onCheckedItemsChange(checkedItems);
    setAllChecked(checkedItems.length === items.length); // 모든 항목이 선택된 경우에만 "모든 체크"가 체크됨
  }, [checkedItems, items.length, onCheckedItemsChange]);

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
    }
  };

  return (
    <div>
      {allItems.map((item) => (
        <div 
          key={item.id} 
          style={styles.checkboxWrapper} 
          onClick={() => handleCheckboxChange(item.id)}
        >
          <div
            style={{
              ...styles.checkbox,
              ...(item.id === 'all' && allChecked ? styles.checkboxChecked : {}),
              ...(checkedItems.includes(item.id) ? styles.checkboxChecked : {}),
            }}
          >
            {(item.id === 'all' && allChecked) || (checkedItems.includes(item.id)) ? (
              <div style={styles.checkmark}></div>
            ) : null}
          </div>
          <label style={styles.label}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default KbCheckboxList;
