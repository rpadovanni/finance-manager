import { TIncomeDistribution } from './types';

export const checkPercentageGreaterThanOneHundred = async (
  incomeDistributions: TIncomeDistribution[],
) => {
  const totalPercentage = incomeDistributions.reduce(
    (acc, distribution) => acc + distribution.percentage,
    0,
  );

  return totalPercentage > 100;
};
