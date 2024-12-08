import {
  TIncomeDistribution,
  TIncomeDistributionPatchPayload,
  TIncomeDistributionPayload,
  TMonthlyIncome,
  TMonthlyIncomePayload,
  TMonthlyIncomeWithDistributions,
} from './types';

// Income Distribution Mocks
export const incomeDistributionMock: TIncomeDistribution = {
  amount: 1000,
  category: 'Food',
  monthly_income_id: 1,
  percentage: 50,
  id: 1,
  created_at: new Date('2022-02-02').toISOString(),
  updated_at: new Date('2022-03-03').toISOString(),
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
  amount: 1000,
  date: '2021-01-01',
  name: 'Salary',
  id: 1,
  created_at: new Date('2021-01-01').toISOString(),
  updated_at: new Date('2021-01-02').toISOString(),
};

export const monthlyIncomeWithDistributionsMock: TMonthlyIncomeWithDistributions =
  {
    ...monthlyIncomeMock,
    distributions: [incomeDistributionMock],
  };

export const monthlyIncomePayloadMock: TMonthlyIncomePayload = {
  amount: 1000,
  date: '2021-01-01',
  name: 'Salary',
};
