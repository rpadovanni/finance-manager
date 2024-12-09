import { createSwaggerSpec } from 'next-swagger-doc';
import {
  goalPatchSchema,
  goalPostSchema,
  goalSchema,
} from './schemas/goals.schema';
import {
  monthlyIncomePostAndPatchSchema,
  monthlyIncomeSchema,
} from './schemas/monthly-income.schema';
import {
  incomeDistributionPatchSchema,
  incomeDistributionPostSchema,
  incomeDistributionSchema,
} from './schemas/income-distribution.schema';
import {
  spendingLimitsPostSchema,
  spendingLimitsSchema,
} from './schemas/spending-limits.schema';

export const getApiDocs = async () => {
  if (typeof window === 'undefined') {
    const spec = createSwaggerSpec({
      apiFolder: './src/app/**/*',
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Finance Manager API',
          version: '1.0.0',
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
          schemas: {
            // Financial Planning
            Goal: goalSchema,
            GoalPatch: goalPatchSchema,
            GoalPost: goalPostSchema,
            IncomeDistribution: incomeDistributionSchema,
            IncomeDistributionPatchSchema: incomeDistributionPatchSchema,
            IncomeDistributionPostSchema: incomeDistributionPostSchema,
            MonthlyIncome: monthlyIncomeSchema,
            MonthlyIncomePostAndPatchSchema: monthlyIncomePostAndPatchSchema,
            SpendingLimit: spendingLimitsSchema,
            SpendingLimitsPatchSchema: incomeDistributionPatchSchema,
            SpendingLimitsPostSchema: spendingLimitsPostSchema,
          },
        },
        tags: [
          // Financial Planning
          { name: 'Financial Planning - Monthly Income' },
          { name: 'Financial Planning - Monthly Income Distribution' },
          { name: 'Financial Planning - Goals' },
          { name: 'Financial Planning - Spending Limits' },
        ],
        security: [],
      },
    });

    return spec;
  }

  return null;
};
