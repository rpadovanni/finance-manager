import { goalsReducer } from '@/app/planning/goals/redux/goals.slice';
import planningReducer from '@/app/planning/redux/planning.slice';
import { spendingLimitsReducer } from '@/planning/spending-limits/redux/spending-limits.slice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
