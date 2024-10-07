import { createSlice } from '@reduxjs/toolkit';

// createManagerCheck 대신 createSlice 사용
const ManagerCheck = createSlice({
  name: 'manager',
  initialState: {
    isManagerVisible: true, 
  },
  reducers: {
    managerType: (state) => {
      state.isManagerVisible = true; 
    },
    userType: (state) => {
      state.isManagerVisible = false; 
    },
  },
});

// 액션과 리듀서를 export
export const { managerType, userType } = ManagerCheck.actions;
export default ManagerCheck.reducer;
