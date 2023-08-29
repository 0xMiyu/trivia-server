/*
  Warnings:

  - Made the column `questionId` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correct` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicture` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalWins` on table `PlayerProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quizId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timeLimit` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `points` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `week` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDateTime` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `QuizEntry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numOfCorrect` on table `QuizEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "questionId" SET NOT NULL,
ALTER COLUMN "correct" SET NOT NULL,
ALTER COLUMN "text" SET NOT NULL;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "userName" SET NOT NULL,
ALTER COLUMN "profilePicture" SET NOT NULL;

-- AlterTable
ALTER TABLE "PlayerProfile" ALTER COLUMN "totalWins" SET NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "quizId" SET NOT NULL,
ALTER COLUMN "timeLimit" SET NOT NULL,
ALTER COLUMN "timeLimit" SET DEFAULT 60,
ALTER COLUMN "text" SET NOT NULL,
ALTER COLUMN "points" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "week" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "startDateTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "QuizEntry" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "numOfCorrect" SET NOT NULL;
