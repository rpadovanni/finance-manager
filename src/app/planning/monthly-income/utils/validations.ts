import { TIncomeDistribution } from './types';

export const getAllocatedPercentage = (
  incomeDistributions: TIncomeDistribution[],
) => {
  return incomeDistributions.reduce(
    (acc, distribution) => acc + distribution.percentage,
    0,
  );
};

export const checkPercentageAllocationAllowed = ({
  allocated,
  current,
  newPercentage,
}: {
  allocated: number;
  current?: number;
  newPercentage: number;
}): boolean => {
  const totalPercentage = allocated - (current || 0) + newPercentage;
  return totalPercentage <= 100;
};
