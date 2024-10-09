import { createSlice } from '@reduxjs/toolkit';

const ScreenSlice = createSlice({
    name: 'screenSize',
    initialState: {
      tabWidth: '1131px',
      tabHeight: '638px',
    },
    reducers: {
        setDimensions: (state, action) => {
            state.tabWidth = action.payload.tabWidth;
            state.tabHeight = action.payload.tabHeight;
        },
    },
});

export const { setDimensions } = ScreenSlice.actions;
export default ScreenSlice.reducer;
