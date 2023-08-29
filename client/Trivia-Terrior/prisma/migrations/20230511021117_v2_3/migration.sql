/*
  Warnings:

  - You are about to drop the column `role` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" SERIAL NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId","publicKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_publicKey_key" ON "Admin"("publicKey");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "Player"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
