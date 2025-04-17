-- AlterTable
ALTER TABLE "ProspectEvent" ADD COLUMN     "summary" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tags" TEXT[];
