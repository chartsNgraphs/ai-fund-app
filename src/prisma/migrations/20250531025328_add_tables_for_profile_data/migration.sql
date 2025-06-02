-- CreateTable
CREATE TABLE "ProfileProperty" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "marketTotalValue" DOUBLE PRECISION NOT NULL,
    "mailingAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoliticalContribution" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "committeeName" TEXT NOT NULL,
    "committeeType" TEXT NOT NULL,
    "committeeState" TEXT NOT NULL,
    "committeeCity" TEXT NOT NULL,
    "committeeZip" TEXT NOT NULL,
    "committeeCreatedAt" TEXT NOT NULL,
    "committeeCycle" INTEGER NOT NULL,
    "committeeParty" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "candidateLastName" TEXT NOT NULL,
    "candidateMiddleName" TEXT NOT NULL,
    "contributionReceiptAmount" DOUBLE PRECISION NOT NULL,
    "contributorFirstName" TEXT NOT NULL,
    "contributorLastName" TEXT NOT NULL,
    "contributorAddressOne" TEXT NOT NULL,
    "contributorAddressTwo" TEXT NOT NULL,
    "contributorCity" TEXT NOT NULL,
    "contributorState" TEXT NOT NULL,
    "contributorZip" TEXT NOT NULL,
    "contributorEmployer" TEXT NOT NULL,
    "contributorOccupation" TEXT NOT NULL,
    "contributionReceiptDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoliticalContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityHolding" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sharesOwned" DOUBLE PRECISION NOT NULL,
    "sharePrice" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityHolding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsiderFiling" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "accessionNumber" TEXT NOT NULL,
    "filedAt" TIMESTAMP(3) NOT NULL,
    "documentType" TEXT NOT NULL,
    "periodOfReport" TEXT NOT NULL,
    "notSubjectToSection16" BOOLEAN NOT NULL,
    "footnotes" JSONB,
    "reportingOwnerName" TEXT NOT NULL,
    "reportingOwnerCik" TEXT NOT NULL,
    "reportingOwnerIsDirector" BOOLEAN NOT NULL,
    "reportingOwnerIsOfficer" BOOLEAN NOT NULL,
    "reportingOwnerOfficerTitle" TEXT,
    "reportingOwnerIsTenPercentOwner" BOOLEAN NOT NULL,
    "reportingOwnerIsOther" BOOLEAN NOT NULL,
    "issuerName" TEXT NOT NULL,
    "issuerCik" TEXT NOT NULL,
    "issuerTradingSymbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsiderFiling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsiderFilingTransaction" (
    "id" TEXT NOT NULL,
    "insiderFilingId" TEXT NOT NULL,
    "securityTitle" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "formType" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "equitySwapInvolved" BOOLEAN NOT NULL,
    "shares" DOUBLE PRECISION NOT NULL,
    "sharesFootnoteId" TEXT[],
    "pricePerShare" DOUBLE PRECISION,
    "acquiredDisposedCode" TEXT NOT NULL,
    "sharesOwnedFollowingTransaction" DOUBLE PRECISION NOT NULL,
    "sharesOwnedFollowingTransactionFootnoteId" TEXT[],
    "ownershipNature" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsiderFilingTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileProperty" ADD CONSTRAINT "ProfileProperty_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProspectProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticalContribution" ADD CONSTRAINT "PoliticalContribution_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProspectProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityHolding" ADD CONSTRAINT "SecurityHolding_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProspectProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsiderFiling" ADD CONSTRAINT "InsiderFiling_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProspectProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsiderFilingTransaction" ADD CONSTRAINT "InsiderFilingTransaction_insiderFilingId_fkey" FOREIGN KEY ("insiderFilingId") REFERENCES "InsiderFiling"("id") ON DELETE CASCADE ON UPDATE CASCADE;
