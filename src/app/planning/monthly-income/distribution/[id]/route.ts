import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkPercentageGreaterThanOneHundred } from '../../utils/validations';

const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;
  const queryId = parseInt(id, 10);

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
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

    const isPercentageGreaterThanOneHundred =
      await checkPercentageGreaterThanOneHundred(incomeDistributions);

    if (isPercentageGreaterThanOneHundred) {
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
