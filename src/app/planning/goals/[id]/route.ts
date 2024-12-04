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

/**
 * @openapi
 * /planning/goals/{id}:
 *   get:
 *     tags:
 *      - Financial Planning - Goals
 *     summary: Fetch a single goal by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to fetch
 *     responses:
 *       200:
 *         description: Goal fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Failed to fetch goal
 */
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;
  const queryId = parseInt(id, 10);

  if (isNaN(queryId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const goal = await prisma.goal.findUnique({
      where: { id: queryId },
    });

    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    return NextResponse.json(goal, { status: 200 });
  } catch (error) {
    console.error('Error fetching goal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goal' },
      { status: 500 },
    );
  }
};

/**
 * @openapi
 * /planning/goals/{id}:
 *   patch:
 *     tags:
 *      - Financial Planning - Goals
 *     summary: Update a single goal by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoalPatch'
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Failed to update goal
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
    const hasGoal = await prisma.goal.findUnique({
      where: { id: queryId },
    });

    if (!hasGoal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

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
};

/**
 * @openapi
 * /planning/goals/{id}:
 *   delete:
 *     tags:
 *      - Financial Planning - Goals
 *     summary: Delete a single goal by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to delete
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Failed to delete goal
 */
export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;
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
};
