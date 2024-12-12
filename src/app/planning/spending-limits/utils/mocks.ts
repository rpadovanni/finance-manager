import {
  TSpendingLimit,
  TSpendingLimitPatchPayload,
  TSpendingLimitPostPayload,
} from './types';

export const spendingLimitMockPayload: TSpendingLimitPostPayload = {
  current_value: 0,
  icon: 'leaf',
  limit_value: 1000,
  name: 'Essential',
  user_id: 'uuid',
};

export const spendingLimitMock: TSpendingLimit = {
  ...spendingLimitMockPayload,
  id: 1,
  created_at: new Date('2021-01-01').toDateString(),
  updated_at: new Date('2024-04-01').toDateString(),
};

export const spendingLimitPatchMockPayload: TSpendingLimitPatchPayload = {
  current_value: 555,
};
