/*
  Warnings:

  - You are about to drop the column `score` on the `QuizEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizEntry" DROP COLUMN "score",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
