import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import planningReducer from '@/app/planning/redux.slice';

export const store = configureStore({
  reducer: {
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
