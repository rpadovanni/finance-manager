import { TGoal, TGoalPatchPayload, TGoalPostPayload } from './types';

export const goalMockPayload: TGoalPostPayload = {
  current_value: 0,
  deadline: new Date('2026-12-31').toDateString(),
  icon: 'house',
  name: 'Buy a house',
  target_value: 100000,
  user_id: 'uuid',
};

export const goalMock: TGoal = {
  ...goalMockPayload,
  id: 1,
  created_at: new Date('2021-01-01').toDateString(),
  updated_at: new Date('2024-04-01').toDateString(),
};

export const patchMockPayload: TGoalPatchPayload = { current_value: 255 };
