import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  checkPercentageAllocationAllowed,
  getAllocatedPercentage,
} from '../utils/validations';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/monthly-income/distribution:
 *   post:
 *     tags:
 *      - Financial Planning - Monthly Income Distribution
 *     summary: Create a new income distribution
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               percentage:
 *                 type: number
 *               amount:
 *                 type: number
 *               monthly_income_id:
 *                 type: number
 *             required:
 *               - category
 *               - percentage
 *               - amount
 *               - monthly_income_id
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IncomeDistribution'
 *       400:
 *         description: Missing required field(s) | Total percentage exceeds 100%
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { category, percentage, amount, monthly_income_id } = body;

    if (!category || !percentage || !amount || !monthly_income_id) {
      return NextResponse.json(
        { error: 'Missing required field(s)' },
        { status: 400 },
      );
    }

    // Check if the total percentage exceeds 100%
    const incomeDistributions = await prisma.incomeDistribution.findMany({
      where: { monthly_income_id },
    });

    const allocated = getAllocatedPercentage(incomeDistributions);
    const isAllowed = checkPercentageAllocationAllowed({
      allocated,
      newPercentage: percentage,
    });

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Total percentage exceeds 100%' },
        { status: 400 },
      );
    }

    const incomeDistribution = await prisma.incomeDistribution.create({
      data: {
        amount,
        category,
        monthly_income_id,
        percentage,
      },
    });

    return NextResponse.json(incomeDistribution, { status: 201 });
  } catch (error) {
    console.error('Error creating income distribution:', error);
    return NextResponse.json(
      { error: 'Failed to create income distribution' },
      { status: 500 },
    );
  }
};
