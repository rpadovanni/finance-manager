import { createSlice } from '@reduxjs/toolkit';
import { goalMock } from '../utils/mocks';

const goalsSlice = createSlice({
  name: 'goals',
  initialState: [goalMock],
  reducers: {
    addGoal(state, action) {
      state.push(action.payload);
    },
    removeGoal(state, action) {
      state = state.filter((goal) => goal.id !== action.payload);
    },
    updateGoal(state, action) {
      const index = state.findIndex((goal) => goal.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

export const { addGoal, removeGoal, updateGoal } = goalsSlice.actions;
export const goalsActions = goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer;
