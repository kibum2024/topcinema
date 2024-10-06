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

const KbGridTest = ({ columnDefsProp, rowDataProp, rowSelectionProp, paginationProp, paginationPageSizeProp, checkedCountProp, searchProp, excellProp, curdProp, insertComponentProp: InsertComponent, updateComponentProp: UpdateComponent }) => {
  const config = KbGridConfig;
  const [columnDefs, setColumnDefs] = useState(columnDefsProp);
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
  const [resizingColumnIndex, setResizingColumnIndex] = useState(null); // 현재 크기 조정 중인 컬럼 인덱스
  const resizingRef = useRef(null); // 마우스 드래그 시작 지점 정보 저장
  const fileInputRef = useRef(null); // 엑셀 업로드 버튼 참조

  const itemsPerPage = paginationPageSizeProp; // 페이지당 항목 수
  let totalPages = null;
  let currentItems = null;

  const startResize = (index, e) => {
    setResizingColumnIndex(index);
    resizingRef.current = {
      startX: e.clientX,
      startWidth: columnDefs[index].width || 150,
    };
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const handleResize = (e) => {
    if (resizingRef.current && resizingColumnIndex !== null) {
      const { startX, startWidth } = resizingRef.current;
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(startWidth + deltaX, 50); // 최소 너비 50px 설정
      setColumnDefs((prevDefs) =>
        prevDefs.map((col, i) => (i === resizingColumnIndex ? { ...col, width: newWidth } : col))
      );
    }
  };

  const stopResize = () => {
    setResizingColumnIndex(null);
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
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

  const handleInputChange = (index, field, value) => {
    const newData = [...rowDatas];
    newData[index][field] = value;
    setRowDatas(newData);
  };

  const rowSelectedClick = (rowIndex) => {
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
      console.log("processedData : ", processedData);
      setRowDatas(processedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
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
          {/* InsertComponent, UpdateComponent 및 Excel 관련 버튼 */}
          <Kbbutton textProp={"등록"} iconProp={"추가"} onClick={() => setShowInsertComponent(true)} />
          <Kbbutton textProp={"수정"} iconProp={"수정"} onClick={() => setShowUpdateComponent(true)} />
          <Kbbutton textProp={"엑셀 다운로드"} iconProp={"엑셀"} onClick={handleDownloadExcel} />
          <Kbbutton textProp={"엑셀 업로드"} iconProp={"엑셀"} onClick={() => fileInputRef.current.click()} />
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleUploadExcel} />
        </div>
      </div>

      {/* 그리드 헤더와 컬럼 너비 조정 */}
      <div style={{ display: 'flex', width: '100%' }}>
        {columnDefs.map((columnDef, index) => (
          <div key={index}
            className="kb-header-cell"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: `${columnDef.width || 150}px`,
              fontWeight: config.fontWeight,
              border: config.headBorder,
              backgroundColor: config.headBackgroundColor,
              position: 'relative',
            }}
          >
            <div className="kb-header-label" style={{ paddingRight: '5px' }}>
              {columnDef.headerName}
            </div>
            {/* 컬럼 너비 조정 핸들 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '5px',
                height: '100%',
                cursor: 'col-resize',
                userSelect: 'none',
              }}
              onMouseDown={(e) => startResize(index, e)}
            />
          </div>
        ))}
      </div>

      {/* 그리드 데이터 렌더링 */}
      <div>
        {currentItems.map((rowData, rowIndex) => {
          return (
            <div key={rowIndex}
              className={`kb-row`}
              style={{ display: 'flex', width: '100%' }}
              onClick={() => rowSelectedClick(rowIndex)}
            >
              {columnDefs.map((columnDef, colIndex) => (
                <div key={colIndex}
                  className='kb-cell'
                  style={{
                    width: `${columnDef.width || 150}px`,
                    border: config.border,
                    padding: '0px 5px',
                  }}
                >
                  {rowData[columnDef.field]}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* InsertComponent 팝업 */}
      {showInsertComponent && (
        <div style={{ position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '500px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}>
            <InsertComponent onClose={() => setShowInsertComponent(false)} />
            <button style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setShowInsertComponent(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* UpdateComponent 팝업 */}
      {showUpdateComponent && (
        <div style={{ position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '500px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}>
            <UpdateComponent onClose={() => setShowUpdateComponent(false)} />
            <button style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setShowUpdateComponent(false)}>닫기</button>
          </div>
        </div>
      )}

      {paginationProp && (
        <div className='kb-grid-page'
          style={{
            width: '100%',
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

export default KbGridTest;
