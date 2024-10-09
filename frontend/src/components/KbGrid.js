import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import Kbbutton from './KbButton';
import KbPagination from './KbPagination';
import KbSwitch from './KbSwitch';
import KbCombo from './KbCombo';
import KbSearchButton from './KbSearchButton';
import { KbGridConfig } from './KbGridConfig';
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import './KbGrid.css';

const KbGrid = ({ columnDefsProp, rowDataProp, rowSelectionProp, paginationProp, paginationPageSizeProp, 
                  checkedCountProp, searchProp, excellProp, curdProp, insertComponentProp: InsertComponent, 
                  updateComponentProp: UpdateComponent, keyProp, onClick }) => {
  const config = KbGridConfig;
  const [columnDefs] = useState(columnDefsProp);
  const [rowDatas, setRowDatas] = useState(rowDataProp);
  const [columnSelected, setColumnSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // 여러 행 선택 관리
  const [isHeaderChecked, setIsHeaderChecked] = useState(false); // 헤더 체크박스 상태
  const [clickCount, setClickCount] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editCell, setEditCell] = useState(null); // 수정 중인 셀 정보
  const [inputSearchName, setInputSearchName] = useState('');
  const [searchColumns, setSearchColumns] = useState([]);
  const [showInsertComponent, setShowInsertComponent] = useState(false);
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null); // 수정할 행 정보
  const itemsPerPage = paginationPageSizeProp; // 페이지당 항목 수
  const fileInputRef = useRef(null);
  let totalPages = null;
  let currentItems = null;

  // 인라인 스타일 객체
  const modalStyles = {
    modal: {
      position: 'fixed',
      zIndex: 1000,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '500px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    },
    closeButton: {
      marginTop: '10px',
      cursor: 'pointer',
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "";  // 날짜가 없으면 빈 문자열 반환
    }

    // date가 숫자 형식일 때 (예: 20240916)
    const dateStr = date.toString();  // 숫자형일 수도 있으므로 문자열로 변환

    if (dateStr.length === 8) {
      const year = dateStr.slice(0, 4);    // 앞 4자리: 연도
      const month = dateStr.slice(4, 6);   // 중간 2자리: 월
      const day = dateStr.slice(6, 8);     // 마지막 2자리: 일

      return `${year}-${month}-${day}`;    // YYYY-MM-DD 형식으로 반환
    }
  };

  function formatTimestamp(timestamp) {
    if (!timestamp) {
      return ""; 
    }
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${day}-${month} ${hours}:${minutes}`;
}

  useEffect(() => {
    setRowDatas(rowDataProp);
  }, [rowDataProp]);

  const switchClick = (newState, rowIndex, field) => {
    handleInputChange(rowIndex, field, newState);
  };

  const searchClick = (newState, rowIndex, field, connectField) => {
    if (newState) {
      if (connectField) {
        handleInputChange(rowIndex, connectField, newState.code);
      }

      handleInputChange(rowIndex, field, newState.name);
    }
  };

  const comboClick = (newState, rowIndex, field) => {
    handleInputChange(rowIndex, field, newState.code);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...rowDatas];
    newData[index][field] = value;
    setRowDatas(newData);
  };

  const formatNumber = (value) => {
    if (isNaN(value) || value === '') return value;
    return Number(value).toLocaleString();
  };

  const totalWidth = columnDefs.reduce((sum, columnDef) => {
    // console.log("columnDef : ", columnDef.width + " name : " + columnDef.headerName)
    return sum + (columnDef.width ? columnDef.width : 150); // 기본값 150px
    // return sum + (columnDef.width ? columnDef.width + 11.5 : 161.5); // 기본값 150px
  }, 0);

  const rowSelectedClick = (rowIndex, keyCode) => {
    if (rowSelectionProp) { // 멀티 선택 여부 확인
      if (selectedRows.includes(rowIndex)) {
        const updatedSelectedRows = selectedRows.filter(index => index !== rowIndex);
        setSelectedRows(updatedSelectedRows);
        setIsHeaderChecked(false); // 헤더 체크박스 해제
      } else {
        const updatedSelectedRows = [...selectedRows, rowIndex];
        setSelectedRows(updatedSelectedRows);
        if (updatedSelectedRows.length === rowDatas.length) {
          setIsHeaderChecked(true);
        }
      }
    } else {
      setSelectedRows([rowIndex]);
      onClick(keyCode);
    }
  };

  const handleHeaderCheckboxClick = () => {
    if (isHeaderChecked) {
      setSelectedRows([]); // 전체 해제
      setIsHeaderChecked(false);
    } else {
      const allRows = rowDatas.map((_, index) => index);
      setSelectedRows(allRows); // 전체 선택
      setIsHeaderChecked(true);
    }
  };

  const columnSortClick = (field) => {
    setColumnSelected(field);
    setClickCount(prevCount => (prevCount + 1) % 3);
  };

  useEffect(() => {
    setClickCount(1);
  }, [columnSelected]);

  const sortedData = [...rowDatas].sort((a, b) => {
    const fieldA = a[columnSelected];
    const fieldB = b[columnSelected];

    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      if (clickCount === 1) return fieldA.localeCompare(fieldB); // 오름차순
      if (clickCount === 2) return fieldB.localeCompare(fieldA); // 내림차순
    } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      if (clickCount === 1) return fieldA - fieldB; // 오름차순
      if (clickCount === 2) return fieldB - fieldA; // 내림차순
    }
    return 0;
  });

  if (paginationProp) {
    totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  } else {
    currentItems = sortedData;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCellEdit = (rowIndex, field) => {
    setEditCell({ rowIndex, field });
  };

  const handleCellBlur = () => {
    setEditCell(null);
  };

  const handleCellChange = (event, chartype) => {
    const { value } = event.target;
    const { rowIndex, field } = editCell;
    if (chartype === 'number') {
      const numericValue = value === '' ? 0 : Number(value);
      handleInputChange(rowIndex, field, numericValue);
    } else if (chartype === 'date') {
      handleInputChange(rowIndex, field, value);
    } else {
      handleInputChange(rowIndex, field, value);
    }
  };

  useEffect(() => {
    // search 속성이 true인 열의 필드를 수집하여 상태에 저장
    const columnsWithSearch = columnDefs
      .filter(columnDef => columnDef.search)
      .map(columnDef => columnDef.field);

    setSearchColumns(columnsWithSearch);
  }, [columnDefs]);

  const inputSearchChange = (e) => {
    setInputSearchName(e.target.value);
  }

  const inputSearch = () => {
    if (inputSearchName.trim() === '') {
      // 검색어가 없으면 원래 데이터를 표시
      setRowDatas(rowDataProp);
    } else {
      const filteredData = rowDatas.filter(data =>
        searchColumns.some(column => {
          const fieldValue = data[column];
          return fieldValue && fieldValue.toString().includes(inputSearchName);
        })
      );

      setRowDatas(filteredData);  // 필터링된 데이터로 업데이트
    }
    setCurrentPage(1);
    setSelectedRows([]);
  }

  const InputDataEnterKey = (e) => {
    if (e.key === 'Enter') {
      inputSearch();
    }
  }

  const buttonClick = (buttonType) => {
    if (buttonType === "추가") {
      handleInsertComponent(); // InsertComponent 표시
    } else if (buttonType === "수정") {
      if (selectedRows.length === 1) {
        handleUpdateComponent(selectedRows[0]); // 선택된 행을 수정
      } else {
        alert('수정할 행을 하나만 선택하세요.');
      }
    } else if (buttonType === "삭제") {
      if (selectedRows.length > 0) {
        handleDeleteRow(); // 선택된 행 삭제
      } else {
        alert('삭제할 행을 선택하세요.');
      }
    }
  };

  // 행 삭제 로직
  const handleDeleteRow = () => {
    const updatedRows = rowDatas.filter((_, index) => !selectedRows.includes(index));
    setRowDatas(updatedRows);
    setSelectedRows([]); // 선택 행 초기화
  };

  const handleInsertComponent = () => {
    setShowInsertComponent(true); // InsertComponent 표시
  };

  const handleUpdateComponent = (rowIndex) => {
    setRowToEdit(rowDatas[rowIndex]); // 수정할 행 데이터 설정
    setShowUpdateComponent(true); // UpdateComponent 표시
  };

  // 엑셀 파일 다운로드
  const handleDownloadExcel = () => {
    const worksheetData = rowDatas.map((rowData) => {
      const row = {};
      columnDefsProp.forEach((colDef) => {
        row[colDef.headerName] = rowData[colDef.field];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'GridData.xlsx');
  };

  // 엑셀 파일 업로드 핸들러
  const handleUploadExcel = (event) => {
    const file = event.target.files[0];  // 파일 선택

    if (!file) {
      return; // 파일이 없으면 함수 종료
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // 첫 번째 시트에서 데이터 읽기
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 엑셀 데이터를 JSON으로 변환 (header: 첫 번째 행을 필드로 사용)
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 2 });

      // 각 열의 필드 이름과 매핑하여 데이터를 처리
      const processedData = jsonData.map((row) => {
        const newRow = {};
        columnDefsProp.forEach((colDef) => {
          // 엑셀 파일의 필드와 그리드의 필드를 매핑
          if (row[colDef.headerName] !== undefined) {
            newRow[colDef.field] = row[colDef.headerName];  // 필드에 맞는 값을 저장
          }
        });
        return newRow;
      });

      // 그리드 데이터를 업데이트
      // console.log("processedData : ", processedData);
      setRowDatas(processedData);
    };

    reader.readAsArrayBuffer(file);
  };

  // 버튼 클릭 시 파일 선택 창을 열기
  const handleButtonClick = () => {
    fileInputRef.current.click();  // 숨겨진 input 요소 클릭 트리거
  };

  // 엑셀 파일 다운로드 핸들러
  const handleDownloadExcelTemplate = () => {
    // headerName과 field를 담은 배열 생성
    const headers = columnDefs.map(colDef => ({
      headerName: colDef.headerName,
      field: colDef.field || '',
    }));

    // 워크시트 데이터 설정 (첫 번째 행: headerName, 두 번째 행: field)
    const worksheetData = [
      headers.map(col => col.headerName),
      // headers.map(col => col.field)        
    ];

    // 워크시트 생성
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    // 워크북에 워크시트 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    // 엑셀 파일로 다운로드
    XLSX.writeFile(workbook, 'GridTemplate.xlsx');
  };

  return (
    <div className='kb-grid-wrap'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: `${totalWidth}px`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            height: config.height,
            gap: '5px',
            marginBottom: '5px',
          }}
        >
          {excellProp === "1" ? (
            <Kbbutton textProp={"다운로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleDownloadExcel()} />
          ) : (
            excellProp === "2" ? (
              <>
                <Kbbutton textProp={"다운로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleDownloadExcel()} />
                <Kbbutton textProp={"업로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleButtonClick()} />
              </>
            ) : (
              excellProp === "3" ? (
                <>
                  <Kbbutton textProp={"다운로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleDownloadExcel()} />
                  <Kbbutton textProp={"양식받기"} iconProp={"엑셀"} stateProp={true} onClick={() => handleDownloadExcelTemplate()} />
                  <Kbbutton textProp={"업로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleButtonClick()} />
                </>
              ) : (
                excellProp === "4" ? (
                  <>
                    <Kbbutton textProp={"양식받기"} iconProp={"엑셀"} stateProp={true} onClick={() => handleDownloadExcelTemplate()} />
                    <Kbbutton textProp={"업로드"} iconProp={"엑셀"} stateProp={true} onClick={() => handleButtonClick()} />
                  </>
                ) : (
                  <></>
                )  
              )
            )
          )
          }
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: 'none' }}  // 화면에 보이지 않도록 숨김
            onChange={handleUploadExcel}  // 파일 선택 시 업로드 처리
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            height: config.height,
            gap: '5px',
            marginBottom: '5px',
          }}
        >
          {curdProp === "1" ? (
            <Kbbutton textProp={"등록"} iconProp={"추가"} stateProp={true} onClick={() => buttonClick('추가')} />
          ) : (
            curdProp === "2" ? (
              <>
                <Kbbutton textProp={"수정"} iconProp={"수정"} stateProp={true} onClick={() => buttonClick('수정')} />
              </>
            ) : (
              curdProp === "3" ? (
                <>
                  <Kbbutton textProp={"삭제"} iconProp={"삭제"} stateProp={true} onClick={() => buttonClick('삭제')} />
                </>
              ) : (
                curdProp === "4" ? (
                  <>
                    <Kbbutton textProp={"등록"} iconProp={"추가"} stateProp={true} onClick={() => buttonClick('추가')} />
                    <Kbbutton textProp={"수정"} iconProp={"수정"} stateProp={true} onClick={() => buttonClick('수정')} />
                  </>
                ) : (
                  curdProp === "5" ? (
                    <>
                      <Kbbutton textProp={"등록"} iconProp={"추가"} stateProp={true} onClick={() => buttonClick('추가')} />
                      <Kbbutton textProp={"수정"} iconProp={"수정"} stateProp={true} onClick={() => buttonClick('수정')} />
                      <Kbbutton textProp={"삭제"} iconProp={"삭제"} stateProp={true} onClick={() => buttonClick('삭제')} />
                    </>
                  ) : (
                    curdProp === "6" ? (
                      <>
                        <Kbbutton textProp={"등록"} iconProp={"추가"} stateProp={true} onClick={() => buttonClick('추가')} />
                        <Kbbutton textProp={"삭제"} iconProp={"삭제"} stateProp={true} onClick={() => buttonClick('삭제')} />
                      </>
                    ) : (
                      curdProp === "7" ? (
                        <>
                          <Kbbutton textProp={"수정"} iconProp={"수정"} stateProp={true} onClick={() => buttonClick('수정')} />
                          <Kbbutton textProp={"삭제"} iconProp={"삭제"} stateProp={true} onClick={() => buttonClick('삭제')} />
                        </>
                      ) : (
                        <></>
                      )  
                    )
                  )
                )
              )
            )
          )
          }
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: 'none' }}  // 화면에 보이지 않도록 숨김
            onChange={handleUploadExcel}  // 파일 선택 시 업로드 처리
          />
        </div>  
      </div>
      {searchProp && (
        <div className="kb-search-content"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: `${totalWidth}px`,
            height: config.height,
            margin: '10px 0px',
          }}
        >
          <input
            type="text"
            className='kb-search-input'
            placeholder="  검색어를 입력하세요"
            onChange={inputSearchChange}
            onKeyDown={InputDataEnterKey}
            style={{
              height: config.height,
              borderRadius: config.borderRadius,
            }}
          />
          <Kbbutton textProp={"조회"} iconProp={"검색"} stateProp={true} onClick={() => inputSearch()} />
        </div>
      )}
      <div
        style={{
          height: config.height,
          lineHeight: config.height,
          color: 'rgb(0, 56, 121)',
          fontWeight: 'bold',
          marginLeft: '5px',
        }}
      >
        <span>전체:{rowDatas.length}개&nbsp;&nbsp;&nbsp;&nbsp;</span>
        {checkedCountProp && (
          <span>선택: {selectedRows.length}개</span>
        )}
      </div>

      {/* InsertComponent 팝업 */}
      {showInsertComponent && (
        <div style={modalStyles.modal}>
          <div style={modalStyles.modalContent}>
            <InsertComponent onClose={() => setShowInsertComponent(false)} />
            <button style={modalStyles.closeButton} onClick={() => setShowInsertComponent(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* UpdateComponent 팝업 */}
      {showUpdateComponent && rowToEdit && (
        <div style={modalStyles.modal}>
          <div style={modalStyles.modalContent}>
            <UpdateComponent rowData={rowToEdit} onClose={() => setShowUpdateComponent(false)} />
            <button style={modalStyles.closeButton} onClick={() => setShowUpdateComponent(false)}>닫기</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', width: `${totalWidth}px`, height: config.height, lineHeight: config.height }}>
        {columnDefs.map((columnDef, index) => {
          return (
            <div key={index} className='kb-header-cell'
              tabIndex="-1"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: config.fontWeight,
                border: config.headBorder,
                backgroundColor: config.headBackgroundColor,
                cursor: 'pointer',
                padding: '0px 5px',
                userSelect: 'none',
                ...(columnDef.width ? { width: `${columnDef.width}px` } : { width: '150px' })
              }}
              onClick={() => { columnDef.field && columnSortClick(columnDef.field) }}
            >
              {columnDef.checkboxSelection && columnDef.headerCheckboxSelection ? (
                <div>
                  <input
                    type="checkbox"
                    checked={isHeaderChecked}
                    onChange={handleHeaderCheckboxClick} // 전체 선택/해제
                  />
                </div>
              ) : (columnDef.numbering ?
                <div className="kb-header-cell-label">
                  <span className="kb-header-cell-text">{columnDef.headerName}</span>
                </div>
                :
                <div className="kb-header-cell-label"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div className="kb-header-cell-text">{columnDef.headerName}</div>
                  {columnSelected === columnDef.field && clickCount === 1 && (
                    <div className="kb-icon-asc" style={{ height: config.iconHeight, lineHeight: config.iconHeight }}>
                      &nbsp;<IoCaretUp style={{ width: config.iconWidth, height: config.iconHeight, lineHeight: config.iconHeight }} />
                    </div>
                  )}
                  {columnSelected === columnDef.field && clickCount === 2 && (
                    <div className="kb-icon-desc" style={{ height: config.iconHeight, lineHeight: config.iconHeight }}>
                      &nbsp;<IoCaretDown style={{ width: config.iconWidth, height: config.iconHeight, lineHeight: config.iconHeight }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div>
        {currentItems.map((rowData, rowIndex) => {
          const actualIndex = (currentPage - 1) * itemsPerPage + rowIndex;
          return (
            <div key={rowIndex}
              className={`kb-row ${(rowIndex + 1) % 2 === 0 ? 'kb-even-color' : ''} ${selectedRows.includes(actualIndex) ? 'kb-row-selected' : ''}`}
              style={{ display: 'flex', width: `${totalWidth}px`, height: config.height, lineHeight: config.height }}
              onClick={() => { rowSelectedClick(actualIndex, rowData[keyProp]) }}
            >
              {columnDefs.map((columnDef, colIndex) => (
                <div key={colIndex}
                  className='kb-cell'
                  tabIndex="-1"
                  style={{
                    border: config.border,
                    padding: '0px 5px',
                    ...(columnDef.width ? { width: `${columnDef.width}px` } : { width: '150px' }),
                    ...(columnDef.align ? { textAlign: `${columnDef.align}` } : {}),
                    ...(columnDef.switch ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}),
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {columnDef.checkboxSelection ? ( //체크박스
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(actualIndex)}
                        onChange={() => rowSelectedClick(actualIndex, rowData[keyProp])} // 선택할 때 체크박스와 행 클릭 연동
                      />
                    </div>
                  ) : columnDef.switch && columnDef.editable ? (
                    <div>
                      <KbSwitch swStatProp={rowData.use} onClick={(newState) => switchClick(newState, actualIndex, columnDef.field)} />
                    </div>
                  ) : columnDef.switch ? (
                    <div style={{ pointerEvents: 'none' }}>
                      <KbSwitch swStatProp={rowData.use} />
                    </div>
                  ) : columnDef.searchButton ? (
                    <div style={{ display: 'flex', position: 'relative' }}>
                      <div>
                        {rowData[columnDef.field]}
                      </div>
                      <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
                        <KbSearchButton itemProp={columnDef.searchname} inputDatasProp={columnDef.searchParams.values} onClick={(newState) => searchClick(newState, actualIndex, columnDef.field, columnDef.searchconnect)} />
                      </div>
                    </div>
                  ) : columnDef.combo ? (
                    <div>
                      <KbCombo comboDataProp={columnDef.comboParams.values} userProp={rowData.user} comboWidthProp={columnDef.width} comboHeightProp={20} onClick={(newState) => comboClick(newState, actualIndex, columnDef.field)} />
                    </div>
                  ) : columnDef.editable ? (
                    editCell && editCell.rowIndex === actualIndex && editCell.field === columnDef.field ? (
                      <input
                        type="text"
                        value={rowData[columnDef.field]}
                        onBlur={handleCellBlur}
                        onChange={(e) => handleCellChange(e, columnDef.chartype)}
                        autoFocus
                        style={{
                          width: `${columnDef.width || 150}px`, // 필드 크기에 맞게 조정
                          height: config.height, // 높이를 맞추기
                          border: 'none',
                          boxSizing: 'border-box',
                        }}
                        onFocus={(e) => e.target.select()} // 클릭 시 기존 값 선택
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.target.blur() } }}
                      />
                    ) : (
                      <div onClick={() => handleCellEdit(actualIndex, columnDef.field)}>
                        {columnDef.separator ? formatNumber(rowData[columnDef.field]) : rowData[columnDef.field]}
                      </div>
                    )
                  ) : columnDef.numbering ? (
                    <div>{formatNumber(actualIndex + 1)}</div>
                  ) : columnDef.chartype === 'date' ? (
                    <div>{formatDate(rowData[columnDef.field])}</div>
                  ) : columnDef.chartype === 'timestamp' ? (
                    <div>{formatTimestamp(rowData[columnDef.field])}</div>
                  ) : columnDef.separator ? (
                    <div>{formatNumber(rowData[columnDef.field])}</div>
                  ) : (
                    <div>{rowData[columnDef.field]}</div>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {paginationProp && (
        <div className='kb-grid-page'
          style={{
            width: `${totalWidth}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <KbPagination
            currentPageProp={currentPage}
            totalPagesProp={totalPages}
            pageLimitProp={5}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default KbGrid;
