/*
  Warnings:

  - The primary key for the `Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[quizEntryId,quizId,publicKey]` on the table `QuizEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quizId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_publicKey_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_quizId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP CONSTRAINT "Option_pkey",
ADD COLUMN     "quizId" INTEGER NOT NULL,
ALTER COLUMN "optionId" DROP DEFAULT,
ADD CONSTRAINT "Option_pkey" PRIMARY KEY ("optionId", "questionId", "quizId");
DROP SEQUENCE "Option_optionId_seq";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
ALTER COLUMN "questionId" DROP DEFAULT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("quizId", "questionId");
DROP SEQUENCE "Question_questionId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "QuizEntry_quizEntryId_quizId_publicKey_key" ON "QuizEntry"("quizEntryId", "quizId", "publicKey");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "User"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_quizId_fkey" FOREIGN KEY ("questionId", "quizId") REFERENCES "Question"("questionId", "quizId") ON DELETE RESTRICT ON UPDATE CASCADE;
