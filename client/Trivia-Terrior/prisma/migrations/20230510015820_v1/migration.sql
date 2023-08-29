-- CreateTable
CREATE TABLE "Player" (
    "publicKey" TEXT NOT NULL,
    "userName" TEXT,
    "profilePicture" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("publicKey")
);

-- CreateTable
CREATE TABLE "PlayerProfile" (
    "publicKey" TEXT NOT NULL,
    "totalWins" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER,
    "correct" BOOLEAN,
    "text" TEXT,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER,
    "timeLimit" INTEGER,
    "text" TEXT,
    "image" TEXT,
    "points" INTEGER DEFAULT 100,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "week" INTEGER,
    "description" TEXT,
    "startDateTime" TIMESTAMP(3),
    "ended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizEntry" (
    "playerProfilePublicKey" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    "score" INTEGER DEFAULT 0,
    "numOfCorrect" INTEGER DEFAULT 0,

    CONSTRAINT "QuizEntry_pkey" PRIMARY KEY ("playerProfilePublicKey","quizId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerProfile_publicKey_key" ON "PlayerProfile"("publicKey");

-- AddForeignKey
ALTER TABLE "PlayerProfile" ADD CONSTRAINT "PlayerProfile_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "Player"("publicKey") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_playerProfilePublicKey_fkey" FOREIGN KEY ("playerProfilePublicKey") REFERENCES "PlayerProfile"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
