import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  checkPercentageAllocationAllowed,
  getAllocatedPercentage,
} from '../../../utils/validations';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/monthly-incomes/distribution/{id}:
 *   patch:
 *     tags:
 *       - Financial Planning - Monthly Income Distribution
 *     summary: Update an income distribution
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the income distribution to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               percentage:
 *                 type: number
 *               amount:
 *                 type: number
 *             required:
 *               - percentage
 *               - amount
 *     responses:
 *       200:
 *         description: OK
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
 *       404:
 *         description: Income distribution not found
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
export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;
  const queryId = parseInt(id, 10);

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const distribution = await prisma.incomeDistribution.findUnique({
      where: { id: queryId },
    });

    if (!distribution) {
      return NextResponse.json(
        { error: 'Monthly distribution not found' },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { percentage, amount } = body;

    if (!amount || !percentage) {
      return NextResponse.json(
        { error: 'Missing required field(s)' },
        { status: 400 },
      );
    }

    // Check if the total percentage exceeds 100%
    const incomeDistributions = await prisma.incomeDistribution.findMany({
      where: { monthly_income_id: queryId },
    });

    const allocatedPercentage = getAllocatedPercentage(incomeDistributions);
    const isAllowed = checkPercentageAllocationAllowed({
      allocated: allocatedPercentage,
      current: distribution.percentage,
      newPercentage: percentage,
    });

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Total percentage exceeds 100%' },
        { status: 400 },
      );
    }

    const incomeDistribution = await prisma.incomeDistribution.update({
      where: { id: queryId },
      data: {
        amount,
        percentage,
      },
    });

    return NextResponse.json(incomeDistribution, { status: 200 });
  } catch (error) {
    console.error('Error updating income distribution:', error);
    return NextResponse.json(
      { error: 'Failed to update income distribution' },
      { status: 500 },
    );
  }
};
