/*
  Warnings:

  - You are about to drop the column `month` on the `MonthlyIncome` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `MonthlyIncome` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthlyIncome" DROP COLUMN "month",
DROP COLUMN "year";
