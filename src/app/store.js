import { configureStore } from '@reduxjs/toolkit';
import backgroundImageReducer from '../features/backgroundImage/backgroundImageSlice';
import weatherSlice from '../features/wheater/weatherSlice';

export const store = configureStore({
  reducer: {
    backgroundImage: backgroundImageReducer,
    weather: weatherSlice
  },
});
