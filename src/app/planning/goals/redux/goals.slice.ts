import { createSlice } from '@reduxjs/toolkit';
import { goalMock } from '../utils/mocks';

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [goalMock],
  },
  reducers: {
    addGoal(state, action) {
      state.goals.push(action.payload);
    },
    removeGoal(state, action) {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
    updateGoal(state, action) {
      const index = state.goals.findIndex(
        (goal) => goal.id === action.payload.id,
      );
      state.goals[index] = action.payload;
    },
  },
});

export const { addGoal, removeGoal, updateGoal } = goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer;
