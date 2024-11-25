/*
  Warnings:

  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_user_id_fkey";

-- DropTable
DROP TABLE "Budget";

-- CreateTable
CREATE TABLE "SpendingLimit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "current_value" DOUBLE PRECISION,
    "limit_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "SpendingLimit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpendingLimit" ADD CONSTRAINT "SpendingLimit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
