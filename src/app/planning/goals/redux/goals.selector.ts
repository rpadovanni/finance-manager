import { RootState } from '@/store/store';

export const selectGoals = (state: RootState) => state.goals.goals;
export const selectGoalById = (id: number) => (state: RootState) =>
  state.goals.goals.find((goal) => goal.id === id);
