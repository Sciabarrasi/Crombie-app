/*
  Warnings:

  - You are about to drop the column `userId` on the `expense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_userId_fkey`;

-- AlterTable
ALTER TABLE `expense` DROP COLUMN `userId`;
