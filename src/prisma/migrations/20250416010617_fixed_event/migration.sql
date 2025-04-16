/*
  Warnings:

  - Added the required column `status` to the `ProspectEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProspectEvent" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "viewedAt" TIMESTAMP(3);
