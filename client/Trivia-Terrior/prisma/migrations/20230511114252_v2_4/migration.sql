/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_publicKey_fkey";

-- DropForeignKey
ALTER TABLE "QuizEntry" DROP CONSTRAINT "QuizEntry_publicKey_fkey";

-- AlterTable
ALTER TABLE "QuizEntry" ADD COLUMN     "place" INTEGER;

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "User" (
    "publicKey" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "totalWins" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("publicKey")
);

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "User"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizEntry" ADD CONSTRAINT "QuizEntry_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "User"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
