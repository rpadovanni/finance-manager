export type TMonthlyIncomePayload = {
  amount: number;
  date: string;
  name: string;
};

export type TMonthlyIncome = TMonthlyIncomePayload & {
  id: number;

  created_at: Date;
  updated_at: Date;
};

export type TIncomeDistributionPayload = {
  amount: number;
  category: string;
  monthly_income_id: number;
  percentage: number;
};

export type TIncomeDistribution = TIncomeDistributionPayload & {
  id: number;
  monthly_income_id: number;

  created_at: Date;
  updated_at: Date;
};

export type TMonthlyIncomeWithDistributions = TMonthlyIncome &
  TIncomeDistribution[];
