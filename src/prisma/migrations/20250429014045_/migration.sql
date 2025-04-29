/*
  Warnings:

  - You are about to drop the column `givingCapacity` on the `ProspectProfile` table. All the data in the column will be lost.
  - You are about to drop the column `givingScore` on the `ProspectProfile` table. All the data in the column will be lost.
  - You are about to drop the column `netWorth` on the `ProspectProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProspectProfile" DROP COLUMN "givingCapacity",
DROP COLUMN "givingScore",
DROP COLUMN "netWorth";
