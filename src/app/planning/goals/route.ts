import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/goals:
 *  get:
 *    tags:
 *      - Financial Planning - Goals
 *    summary: Get all goals for a user
 *    responses:
 *      200:
 *        description: Returns an array of goals
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Goal'
 *    500:
 *      description: Failed to fetch goals
 */
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

/**
 * @openapi
 * /planning/goals:
 *  post:
 *    tags:
 *      - Financial Planning - Goals
 *    summary: Create a new goal
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/GoalPost'
 *    responses:
 *      201:
 *        description: Goal created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Goal'
 *      400:
 *        description: Missing required fields
 *      500:
 *        description: Failed to create goal
 */
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
