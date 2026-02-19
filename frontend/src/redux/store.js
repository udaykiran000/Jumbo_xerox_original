import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';
import configReducer from './slices/configSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    config: configReducer,
  },
});
