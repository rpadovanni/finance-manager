import { RootState } from '@/store/store';

export const selectGoals = (state: RootState) => state.planning.goals;
export const selectGoalById = (id: number) => (state: RootState) =>
  state.planning.goals.find((goal) => goal.id === id);
