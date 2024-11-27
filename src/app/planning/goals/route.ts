import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const goals = await prisma.goal.findMany({
      where: { user_id: '96bee946-c7ef-48ed-854e-abaac87e4a80' },
    });

    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { user_id, name, icon, target_value, current_value, deadline } = body;

    if (!user_id || !name || !target_value) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const newGoal = await prisma.goal.create({
      data: {
        current_value,
        deadline,
        icon,
        name,
        target_value,
        user_id,
      },
    });

    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 },
    );
  }
};
