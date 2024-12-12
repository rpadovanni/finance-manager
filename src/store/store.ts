import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import planningReducer from '@/app/planning/redux.slice';
import userReducer from '@/app/user/redux/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
