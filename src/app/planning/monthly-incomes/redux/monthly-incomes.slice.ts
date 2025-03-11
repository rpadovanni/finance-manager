import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { monthlyIncomeMock } from '../utils/mocks';
import { TMonthlyIncome } from '../utils/types';

const initialState: TMonthlyIncome[] = [
  monthlyIncomeMock,
  {
    ...monthlyIncomeMock,
    id: 2,
    income: 1000,
    created_at: new Date('2020-10-11').toISOString(),
  },
  {
    ...monthlyIncomeMock,
    id: 3,
    income: 7500,
    created_at: new Date('2020-11-05').toISOString(),
  },
];

const monthlyIncomesSlice = createSlice({
  name: 'monthlyIncome',
  initialState,
  reducers: {
    addMonthlyIncome: (state, action: PayloadAction<TMonthlyIncome>) => {
      state.push(action.payload);
    },
    updateMonthlyIncome: (state, action: PayloadAction<TMonthlyIncome>) => {
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
