/*
  Warnings:

  - You are about to drop the column `name` on the `Conversation` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Conversation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "name",
DROP COLUMN "status",
ADD COLUMN     "status" "ConversationStatus" NOT NULL;
