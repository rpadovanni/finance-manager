import { RootState } from '@/store/store';

export const selectMonthlyIncomes = (state: RootState) =>
  state.planning.monthlyIncomes;
export const selectMonthlyIncomeById = (id: number) => (state: RootState) =>
  state.planning.monthlyIncomes.find(
    (monthlyIncome) => monthlyIncome.id === id,
  );
