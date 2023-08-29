/*
  Warnings:

  - The primary key for the `Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Option` table. All the data in the column will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Quiz` table. All the data in the column will be lost.
  - The primary key for the `QuizEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerProfilePublicKey` on the `QuizEntry` table. All the data in the column will be lost.
  - You are about to drop the `PlayerProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `publicKey` to the `QuizEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerProfile" DROP CONSTRAINT "PlayerProfile_publicKey_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_playerProfilePublicKey_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_quizId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP CONSTRAINT "Option_pkey",
DROP COLUMN "id",
ADD COLUMN     "optionId" SERIAL NOT NULL,
ADD CONSTRAINT "Option_pkey" PRIMARY KEY ("optionId");

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "totalWins" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "id",
ADD COLUMN     "questionId" SERIAL NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId");

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "quizId" SERIAL NOT NULL,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quizId");

-- AlterTable
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_pkey",
DROP COLUMN "playerProfilePublicKey",
ADD COLUMN     "publicKey" TEXT NOT NULL,
ADD CONSTRAINT "QuizEntry_pkey" PRIMARY KEY ("publicKey", "quizId");

-- DropTable
DROP TABLE "PlayerProfile";

-- CreateTable
CREATE TABLE "Leaderboard" (
    "publicKey" TEXT NOT NULL,
    "placement" INTEGER,
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("publicKey")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "Player"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
