import { createSlice } from '@reduxjs/toolkit';
import { spendingLimitMock } from '../utils/mocks';

const spendingLimitsSlice = createSlice({
  name: 'spendingLimits',
  initialState: [spendingLimitMock],
  reducers: {
    addSpendingLimit(state, action) {
      state.push(action.payload);
    },
    removeSpendingLimit(state, action) {
      state = state.filter(
        (spendingLimit) => spendingLimit.id !== action.payload,
      );
    },
    updateSpendingLimit(state, action) {
      const index = state.findIndex(
        (spendingLimit) => spendingLimit.id === action.payload.id,
      );
      state[index] = action.payload;
    },
  },
});

export default spendingLimitsSlice.reducer;
export const { addSpendingLimit, removeSpendingLimit, updateSpendingLimit } =
  spendingLimitsSlice.actions;
