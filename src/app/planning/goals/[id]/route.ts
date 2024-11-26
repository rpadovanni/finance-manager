/**
 * Handles GET, PATCH, DELETE for a dynamic route with ID
 * Example: /api/planning/goals/[id]
 *
 *  Observations:
 *  1. The GET function fetches a single goal by ID.
 *  2. The PATCH function updates a single goal by ID.
 *  3. The DELETE function deletes a single goal by ID.
 *  4. Don't remove the `request: Request` parameter from the function signature,
 *     otherwise the endpoint won't work.
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const queryId = parseInt(id, 10);

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const goals = await prisma.goal.findUnique({
      where: { id: queryId },
    });

    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const queryId = parseInt(id, 10);

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, icon, target_value, current_value, deadline } = body;

    const updatedGoal = await prisma.goal.update({
      where: { id: queryId },
      data: {
        name,
        icon,
        deadline,
        target_value,
        current_value,
      },
    });

    return NextResponse.json(updatedGoal, { status: 200 });
  } catch (error) {
    console.error('Error updating goal:', error);
    return NextResponse.json(
      { error: 'Failed to update goal' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const queryId = parseInt(id, 10);

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const hasGoal = await prisma.goal.findUnique({
      where: { id: queryId },
    });

    if (!hasGoal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    await prisma.goal.delete({
      where: { id: queryId },
    });

    return NextResponse.json({ message: 'Goal deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json(
      { error: 'Failed to delete goal' },
      { status: 500 },
    );
  }
}
