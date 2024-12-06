import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/spending-limits:
 *   get:
 *     tags:
 *      - Financial Planning - Spending Limits
 *     summary: Fetch all spending limits
 *     responses:
 *       200:
 *         description: Spending limits fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SpendingLimit'
 *       500:
 *         description: Failed to fetch spending limits
 */
export const GET = async () => {
  try {
    const spendingLimits = await prisma.spendingLimit.findMany({
      where: { user_id: '96bee946-c7ef-48ed-854e-abaac87e4a80' },
    });

    if (spendingLimits.length === 0) {
      return NextResponse.json(
        { error: 'No spending limits found' },
        { status: 404 },
      );
    }

    return NextResponse.json(spendingLimits, { status: 200 });
  } catch (error) {
    console.error('Error fetching spending limits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spending limits' },
      { status: 500 },
    );
  }
};

/**
 * @openapi
 * /planning/spending-limits:
 *  post:
 *    tags:
 *      - Financial Planning - Spending Limits
 *    summary: Create a new spending limit
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SpendingLimit'
 *    responses:
 *      201:
 *        description: Spending limit created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SpendingLimit'
 *      400:
 *        description: Missing required fields
 *      500:
 *        description: Failed to create spending limit
 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { user_id, name, limit_value, icon, current_value } = body;

    if (!user_id || !name || !limit_value) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // TODO: Validate user_id

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
};
