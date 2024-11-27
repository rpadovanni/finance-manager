import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkPercentageGreaterThanOneHundred } from '../utils/validations';

const prisma = new PrismaClient();

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

    const isPercentageGreaterThanOneHundred =
      await checkPercentageGreaterThanOneHundred(incomeDistributions);

    if (isPercentageGreaterThanOneHundred) {
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
