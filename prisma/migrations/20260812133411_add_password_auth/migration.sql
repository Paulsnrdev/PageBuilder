-- CreateEnum
CREATE TYPE "AuthAttemptType" AS ENUM ('LOGIN', 'SIGNUP');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "AuthAttempt" (
    "id" TEXT NOT NULL,
    "type" "AuthAttemptType" NOT NULL,
    "email" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuthAttempt_type_email_createdAt_idx" ON "AuthAttempt"("type", "email", "createdAt");

-- CreateIndex
CREATE INDEX "AuthAttempt_type_ipHash_createdAt_idx" ON "AuthAttempt"("type", "ipHash", "createdAt");
