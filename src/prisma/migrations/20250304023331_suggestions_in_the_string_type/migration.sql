/*
  Warnings:

  - You are about to drop the `SuggestedResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SuggestedResponse" DROP CONSTRAINT "SuggestedResponse_messageId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "suggestedResponses" TEXT[];

-- DropTable
DROP TABLE "SuggestedResponse";
