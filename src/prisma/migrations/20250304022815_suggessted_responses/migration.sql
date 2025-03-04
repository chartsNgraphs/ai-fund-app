-- CreateTable
CREATE TABLE "SuggestedResponse" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "SuggestedResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SuggestedResponse" ADD CONSTRAINT "SuggestedResponse_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
