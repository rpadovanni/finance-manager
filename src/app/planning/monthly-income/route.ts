import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/monthly-income:
 *  get:
 *    tags:
 *      - Financial Planning - Monthly Income
 *    summary: Get all monthly incomes for a user
 *    responses:
 *      200:
 *        description: Returns an array of monthly incomes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/MonthlyIncome'
 *    500:
 *      description: Failed to fetch monthly incomes
 */
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

/**
 * @openapi
 * /planning/monthly-income:
 *  post:
 *    tags:
 *      - Financial Planning - Monthly Income
 *    summary: Create a new monthly income
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MonthlyIncomePostAndPatchSchema'
 *    responses:
 *      201:
 *        description: Monthly income created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MonthlyIncome'
 *      400:
 *        description: Missing required field(s)
 *      500:
 *        description: Failed to create monthly income
 */
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
