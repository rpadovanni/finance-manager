import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { monthlyIncomeWithDistributionsMock } from '../utils/mocks';

interface MonthlyIncome {
  id: number;
  income: number;
  created_at: string;
  // Add other properties if needed
}

const initialState: MonthlyIncome[] = [
  monthlyIncomeWithDistributionsMock,
  {
    ...monthlyIncomeWithDistributionsMock,
    id: 2,
    income: 1000,
    created_at: new Date('2020-10-11').toISOString(),
  },
  {
    ...monthlyIncomeWithDistributionsMock,
    id: 3,
    income: 7500,
    created_at: new Date('2020-11-05').toISOString(),
  },
];

const monthlyIncomesSlice = createSlice({
  name: 'monthlyIncome',
  initialState,
  reducers: {
    addMonthlyIncome: (state, action: PayloadAction<MonthlyIncome>) => {
      state.push(action.payload);
    },
    updateMonthlyIncome: (state, action: PayloadAction<MonthlyIncome>) => {
      const index = state.findIndex(
        (monthlyIncome) => monthlyIncome.id === action.payload.id,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export default monthlyIncomesSlice.reducer;
export const { addMonthlyIncome, updateMonthlyIncome } =
  monthlyIncomesSlice.actions;
