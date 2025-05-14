-- DropForeignKey
ALTER TABLE "AdditionalPerson" DROP CONSTRAINT "AdditionalPerson_prospectId_fkey";

-- DropForeignKey
ALTER TABLE "ProspectAddress" DROP CONSTRAINT "ProspectAddress_prospectId_fkey";

-- DropForeignKey
ALTER TABLE "ProspectEvent" DROP CONSTRAINT "ProspectEvent_prospectId_fkey";

-- DropForeignKey
ALTER TABLE "ProspectProfile" DROP CONSTRAINT "ProspectProfile_prospectId_fkey";

-- DropForeignKey
ALTER TABLE "ProspectSocialLink" DROP CONSTRAINT "ProspectSocialLink_prospectId_fkey";

-- AddForeignKey
ALTER TABLE "AdditionalPerson" ADD CONSTRAINT "AdditionalPerson_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectAddress" ADD CONSTRAINT "ProspectAddress_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectEvent" ADD CONSTRAINT "ProspectEvent_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectProfile" ADD CONSTRAINT "ProspectProfile_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspectSocialLink" ADD CONSTRAINT "ProspectSocialLink_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
