import { createSlice } from '@reduxjs/toolkit';

const BannerSlice = createSlice({
  name: 'banner',
  initialState: {
    isVisible: true, // 배너가 처음에는 보이도록 설정
  },
  reducers: {
    closeBanner: (state) => {
      state.isVisible = false; // 배너 숨기기
    },
    showBanner: (state) => {
      state.isVisible = true; // 배너 보이기 (필요한 경우 사용)
    },
  },
});

export const { closeBanner, showBanner } = BannerSlice.actions;
export default BannerSlice.reducer;
