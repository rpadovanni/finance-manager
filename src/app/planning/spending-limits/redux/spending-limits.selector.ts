import { RootState } from '@/store/store';

export const selectSpendingLimits = (state: RootState) =>
  state.planning.spendingLimits;
export const selectSpendingLimitById = (id: number) => (state: RootState) =>
  state.planning.spendingLimits.find((goal) => goal.id === id);
