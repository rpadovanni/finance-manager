import { TIncomeDistribution } from './types';

export const getAllocatedPercentage = (
  incomeDistributions: TIncomeDistribution[],
): number =>
  incomeDistributions.reduce((acc, { percentage }) => acc + percentage, 0);

export const checkPercentageAllocationAllowed = ({
  allocated,
  current = 0,
  newPercentage,
}: {
  allocated: number;
  current?: number;
  newPercentage: number;
}): boolean => allocated - current + newPercentage <= 100;
