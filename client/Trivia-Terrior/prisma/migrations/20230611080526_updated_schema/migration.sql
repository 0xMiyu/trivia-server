-- CreateTable
CREATE TABLE "Prize" (
    "quizId" INTEGER NOT NULL,
    "prizeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "solValue" INTEGER NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("quizId","prizeId")
);

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("quizId") ON DELETE CASCADE ON UPDATE CASCADE;
