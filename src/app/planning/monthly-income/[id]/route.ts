import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/monthly-income/{id}:
 *  patch:
 *    tags:
 *      - Financial Planning - Monthly Income
 *    summary: Update a monthly income
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the monthly income to update
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MonthlyIncomePostAndPatchSchema'
 *    responses:
 *      200:
 *        description: Returns the updated monthly income
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MonthlyIncome'
 *      400:
 *        description: Invalid ID or missing required field
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      404:
 *         description: Monthly income not found
 *      500:
 *        description: Failed to update monthly income
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
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
    const hasMonthlyIncome = await prisma.monthlyIncome.findUnique({
      where: { id: queryId },
    });

    if (!hasMonthlyIncome) {
      return NextResponse.json(
        { error: 'Monthly income not found' },
        { status: 404 },
      );
    }

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
