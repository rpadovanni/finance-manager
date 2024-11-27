import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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

  try {
    const body = await request.json();
    const { income } = body;

    if (!income) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 },
      );
    }

    const updatedMonthlyIncome = await prisma.monthlyIncome.update({
      where: { id: queryId },
      data: { income },
    });

    return NextResponse.json(updatedMonthlyIncome, { status: 200 });
  } catch (error) {
    console.error('Error updating monthly income:', error);
    return NextResponse.json(
      { error: 'Failed to update monthly income' },
      { status: 500 },
    );
  }
};
