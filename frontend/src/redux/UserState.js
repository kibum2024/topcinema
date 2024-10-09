import { createSlice } from '@reduxjs/toolkit';

const UserState = createSlice({
  name: 'userState',
  initialState: {
    userType: true,  
    userCode: 1,           
    userName: '홍서방',           
    userEmail: 'dnflboy@gmail.com',           
    userRole: 'manager',           
  },
  reducers: {
    // 관리자 권한 설정
    setUserState: (state, action) => {
      state.userType = action.payload.userType;
      state.userCode = action.payload.userCode;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userRole = action.payload.userRole;
      // state.userType = true;
      // state.userCode = 1;
      // state.userName = '홍서방';
      // state.userEmail = 'dnflboy@gmail.com';
      // state.userRole = 'manager';
    },
  },
});

// 액션과 리듀서를 export
export const { setUserState } = UserState.actions;
export default UserState.reducer;
