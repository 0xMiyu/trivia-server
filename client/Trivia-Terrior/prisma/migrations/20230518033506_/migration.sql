/*
  Warnings:

  - The primary key for the `QuizEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `place` on the `QuizEntry` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leaderboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'OPERATOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_publicKey_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_publicKey_fkey";

-- AlterTable
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_pkey",
DROP COLUMN "place",
ADD COLUMN     "quizEntryId" SERIAL NOT NULL,
ADD COLUMN     "ranking" INTEGER,
ADD CONSTRAINT "QuizEntry_pkey" PRIMARY KEY ("quizEntryId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "overallRanking" INTEGER,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Leaderboard";
