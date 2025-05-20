/*
  Warnings:

  - You are about to drop the column `reply` on the `faq` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "faq" DROP COLUMN "reply",
ADD COLUMN     "answer" TEXT;
