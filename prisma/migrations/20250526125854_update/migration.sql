/*
  Warnings:

  - The `documents` column on the `dispute` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "dispute" DROP COLUMN "documents",
ADD COLUMN     "documents" TEXT[];
