import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const returnedData = await prisma.monthlyIncome.findMany({
      where: { user_id: '96bee946-c7ef-48ed-854e-abaac87e4a80' },
      orderBy: {
        id: 'desc',
      },
      include: {
        distributions: true,
      },
    });

    return NextResponse.json(returnedData, { status: 200 });
  } catch (error) {
    console.error('Error fetching monthly incomes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monthly income' },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { income, user_id } = body;

    if (!income || !user_id) {
      return NextResponse.json(
        { error: 'Missing required field(s)' },
        { status: 400 },
      );
    }

    const newMonthlyIncome = await prisma.monthlyIncome.create({
      data: {
        income,
        user_id: '96bee946-c7ef-48ed-854e-abaac87e4a80',
      },
    });

    return NextResponse.json(newMonthlyIncome, { status: 201 });
  } catch (error) {
    console.error('Error creating monthly income:', error);
    return NextResponse.json(
      { error: 'Failed to create monthly income' },
      { status: 500 },
    );
  }
};
