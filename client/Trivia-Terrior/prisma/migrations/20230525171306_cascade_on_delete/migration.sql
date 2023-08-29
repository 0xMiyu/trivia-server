-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_publicKey_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_quizId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "User"("publicKey") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_quizId_fkey" FOREIGN KEY ("questionId", "quizId") REFERENCES "Question"("questionId", "quizId") ON DELETE CASCADE ON UPDATE CASCADE;
