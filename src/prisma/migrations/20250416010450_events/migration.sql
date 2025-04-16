-- CreateTable
CREATE TABLE "ProspectEvent" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "eventRaw" TEXT NOT NULL,
    "eventHtml" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProspectEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProspectEvent" ADD CONSTRAINT "ProspectEvent_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
