import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handles GET, PATCH, DELETE for a dynamic route with ID
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
    const spendingLimit = await prisma.spendingLimit.findUnique({
      where: { id: queryId },
    });

    if (!spendingLimit) {
      return NextResponse.json(
        { error: 'Spending limit not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(spendingLimit, { status: 200 });
  } catch (error) {
    console.error('Error fetching spending limit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spending limit' },
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
    const { current_value, icon, limit_value, name } = body;

    const updatedSpendingLimit = await prisma.spendingLimit.update({
      where: { id: queryId },
      data: {
        icon,
        current_value,
        limit_value,
        name,
      },
    });

    return NextResponse.json(updatedSpendingLimit, { status: 200 });
  } catch (error) {
    console.error('Error updating spending limit:', error);
    return NextResponse.json(
      { error: 'Failed to update spending limit' },
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
    const hasSpendingLimit = await prisma.spendingLimit.findUnique({
      where: { id: queryId },
    });

    if (!hasSpendingLimit) {
      return NextResponse.json(
        { error: 'Spending limit not found' },
        { status: 404 },
      );
    }

    await prisma.spendingLimit.delete({
      where: { id: queryId },
    });

    return NextResponse.json(
      { message: 'Spending limit deleted' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting spending limit:', error);
    return NextResponse.json(
      { error: 'Failed to delete spending limit' },
      { status: 500 },
    );
  }
}
