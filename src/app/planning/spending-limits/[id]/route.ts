/**
 * Handles GET, PATCH, DELETE for a dynamic route with ID
 * Example: /api/planning/spending-limits/[id]
 *
 * Observations:
 *  1. The GET function fetches a single spending limit by ID.
 *  2. The PATCH function updates a single spending limit by ID.
 *  3. The DELETE function deletes a single spending limit by ID.
 *  4. Don't remove the `request: Request` parameter from the function signature,
 *     otherwise the endpoint won't work.
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @openapi
 * /planning/spending-limits/{id}:
 *   get:
 *     tags:
 *      - Financial Planning - Spending Limits
 *     summary: Fetch a single limit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the limit to fetch
 *     responses:
 *       200:
 *         description: Limit fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SpendingLimit'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Spending limit not found
 *       500:
 *         description: Failed to fetch spending limit
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
};

/**
 * @openapi
 * /planning/spending-limits/{id}:
 *   patch:
 *     tags:
 *      - Financial Planning - Spending Limits
 *     summary: Update a single spending limit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the spending limit to update
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/SpendingLimit'
 *         description: The updated spending limit
 *     responses:
 *       200:
 *         description: Spending limit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SpendingLimit'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Spending limit not found
 *       500:
 *         description: Failed to update spending limit
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
    const spendingLimit = await prisma.spendingLimit.findUnique({
      where: { id: queryId },
    });

    if (!spendingLimit) {
      return NextResponse.json(
        { error: 'Spending limit not found' },
        { status: 404 },
      );
    }

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
};

/**
 * @openapi
 * /planning/spending-limits/{id}:
 *   delete:
 *     tags:
 *      - Financial Planning - Spending Limits
 *     summary: Delete a single spending limit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the spending limit to delete
 *     responses:
 *       200:
 *         description: Spending limit deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Spending limit deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Spending limit not found
 *       500:
 *         description: Failed to delete spending limit
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
};
