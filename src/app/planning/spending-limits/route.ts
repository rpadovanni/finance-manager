import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const spendingLimits = await prisma.spendingLimit.findMany({
      where: { user_id: '96bee946-c7ef-48ed-854e-abaac87e4a80' },
    });

    return NextResponse.json(spendingLimits, { status: 200 });
  } catch (error) {
    console.error('Error fetching spending limits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spending limits' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, name, limit_value, icon, current_value } = body;

    if (!user_id || !name || !limit_value) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const newSpendingLimit = await prisma.spendingLimit.create({
      data: {
        current_value,
        icon,
        limit_value,
        name,
        user_id,
      },
    });

    return NextResponse.json(newSpendingLimit, { status: 201 });
  } catch (error) {
    console.error('Error creating spending limit:', error);
    return NextResponse.json(
      { error: 'Failed to create spending limit' },
      { status: 500 },
    );
  }
}
