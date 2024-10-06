import { configureStore } from '@reduxjs/toolkit';
import BannerSlice from './BannerSlice';
import ManagerCheck from './ManagerCheck';

export const store = configureStore({
  reducer: {
    banner: BannerSlice,
    manager: ManagerCheck,
  },
});
