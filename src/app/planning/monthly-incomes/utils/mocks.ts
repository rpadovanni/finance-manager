import { userMock } from '@/utils/user.mock';
import {
  TIncomeDistribution,
  TIncomeDistributionPatchPayload,
  TIncomeDistributionPayload,
  TMonthlyIncomePayload,
  TMonthlyIncome,
} from './types';

// Common Dates
const createdAt = new Date('2022-02-02').toISOString();
const updatedAt = new Date('2022-03-03').toISOString();
const monthlyIncomeCreatedAt = new Date('2021-01-01').toISOString();
const monthlyIncomeUpdatedAt = new Date('2021-01-02').toISOString();

// Income Distribution Mocks
export const incomeDistributionMock: TIncomeDistribution = {
  amount: 1000,
  category: 'Food',
  monthly_income_id: 1,
  percentage: 50,
  id: 1,
  created_at: createdAt,
  updated_at: updatedAt,
};

export const incomeDistributionPayloadMock: TIncomeDistributionPayload = {
  amount: 1000,
  category: 'Food',
  monthly_income_id: 1,
  percentage: 50,
};

export const incomeDistributionPatchPayloadMock: TIncomeDistributionPatchPayload =
  {
    amount: 255,
    percentage: 25,
  };

// Monthly Income Mocks
export const monthlyIncomeMock: TMonthlyIncome = {
  income: 4200,
  id: 1,
  user_id: userMock.id,
  created_at: monthlyIncomeCreatedAt,
  updated_at: monthlyIncomeUpdatedAt,
  distributions: [incomeDistributionMock],
};

export const monthlyIncomePayloadMock: TMonthlyIncomePayload = {
  income: 2000,
  user_id: userMock.id,
};
