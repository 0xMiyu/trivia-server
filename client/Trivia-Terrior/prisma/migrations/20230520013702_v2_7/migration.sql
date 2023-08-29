-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_publicKey_fkey";

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "User"("publicKey") ON DELETE NO ACTION ON UPDATE NO ACTION;
