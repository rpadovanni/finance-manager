// Monthly Income Types
export type TMonthlyIncomePayload = {
  income: number;
  user_id: string;
};

export type TMonthlyIncome = TMonthlyIncomePayload & {
  id: number;
  created_at: string;
  updated_at: string;

  distributions?: TIncomeDistribution[];
};

// Income Distribution Types
export type TIncomeDistributionPayload = {
  amount: number;
  category: string;
  monthly_income_id: number;
  percentage: number;
};

export type TIncomeDistribution = Omit<
  TIncomeDistributionPayload,
  'monthly_income_id'
> & {
  id: number;
  monthly_income_id: number;
  created_at: Date | string; // date or string because of Prisma and json response
  updated_at: Date | string; // date or string because of Prisma and json response
};

export type TIncomeDistributionPatchPayload = Partial<
  Omit<TIncomeDistributionPayload, 'amount' | 'percentage'>
> & {
  amount: number;
  percentage: number;
};
