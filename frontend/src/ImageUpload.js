import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [originalFileName, setOriginalFileName] = useState('');

  // 파일 확장자 필터링 함수
  const isValidFileType = (file) => {
    const validExtensions = ['image/jpeg', 'image/png'];
    return validExtensions.includes(file.type); // JPG와 PNG 파일만 허용
  };

  // 파일 선택 핸들러
  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    if (!isValidFileType(file)) {
      alert('JPG 또는 PNG 파일만 업로드할 수 있습니다.');
      return;
    }

    setOriginalFileName(file.name); // 원본 파일 이름 저장
    setSelectedFile(file); // 선택된 파일 저장
  };

  // 서버로 파일 업로드 요청
  const handleUpload = async () => {
    if (!selectedFile || !title) {
      alert('제목과 이미지를 입력하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile, originalFileName); // 파일과 파일 이름을 함께 전송
    formData.append('title', title); // 영화 제목도 함께 전송

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(response.data);
    } catch (error) {
      console.error('File upload error:', error); // 오류 발생 시 로그 출력
      setUploadStatus('파일 업로드에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>영화 등록</h1>
      <input
        type="text"
        placeholder="영화 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" accept="image/jpeg,image/png" onChange={handleFileInput} />
      <button onClick={handleUpload}>영화 등록</button>

      {uploadStatus && (
        <div style={{ marginTop: '20px' }}>
          <h2>업로드 상태</h2>
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
