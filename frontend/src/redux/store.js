import { configureStore } from '@reduxjs/toolkit';
import BannerSlice from './BannerSlice';
import UserState from './UserState';
import ScreenSlice from './ScreenSlice';

export const store = configureStore({
  reducer: {
    banner: BannerSlice,
    userState: UserState,
    screenSize: ScreenSlice,
  },
});
