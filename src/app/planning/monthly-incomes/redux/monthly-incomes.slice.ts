import { createSlice } from '@reduxjs/toolkit';
import { monthlyIncomeWithDistributionsMock } from '../utils/mocks';

const monthlyIncomesSlice = createSlice({
  name: 'monthlyIncome',
  initialState: [monthlyIncomeWithDistributionsMock],
  reducers: {
    addMonthlyIncome: (state, action) => {
      state = action.payload;
    },
    updateMonthlyIncome: (state, action) => {
      const index = state.findIndex(
        (monthlyIncome) => monthlyIncome.id === action.payload.id,
      );
      state[index] = action.payload;
    },
  },
});

export const monthlyIncomesReducer = monthlyIncomesSlice.reducer;
export const { addMonthlyIncome, updateMonthlyIncome } =
  monthlyIncomesSlice.actions;
