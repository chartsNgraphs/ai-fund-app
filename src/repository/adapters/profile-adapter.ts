import { ProspectProfile } from "@/model/prospects/prospect-profile";
import { InsiderFiling, ProspectProfile as PrismaProfile, ProfileProperty } from "@prisma/client";

export function adaptModelToPrisma(profile: ProspectProfile): PrismaProfile {

    const profileData = profile.data;

    console.log("Adapting profile data to Prisma format", profileData);

    const properties = profileData.propertyData.map(property => ({
        address: property.address,
        identifier: property.identifier,
        marketTotalValue: property.marketTotalValue,
        mailingAddress: property.mailingAddress
    }));

    const politicalContributions = profileData.politicalContributions?.map(contribution => ({
        candidateId: contribution.candidateId,
        committeeId: contribution.committee.id,
        committeeName: contribution.committee.name,
        committeeType: contribution.committee.type,
        committeeState: contribution.committee.state,
        committeeCity: contribution.committee.city,
        committeeZip: contribution.committee.zip,
        committeeCreatedAt: contribution.committee.createdAt,
        committeeCycle: contribution.committee.cycle,
        committeeParty: contribution.committee.party,
        candidateName: contribution.candidateName,
        candidateLastName: contribution.candidateLastName,
        candidateMiddleName: contribution.candidateMiddleName,
        contributionReceiptAmount: contribution.contributionReceiptAmount,
        contributorFirstName: contribution.contributorFirstName,
        contributorLastName: contribution.contributorLastName,
        contributorAddressOne: contribution.contributorAddress.addressOne,
        contributorAddressTwo: contribution.contributorAddress.addressTwo,
        contributorCity: contribution.contributorAddress.city,
        contributorState: contribution.contributorAddress.state,
        contributorZip: contribution.contributorAddress.zip,
        contributorEmployer: contribution.contributorEmployer,
        contributorOccupation: contribution.contributorOccupation,
        contributionReceiptDate: contribution.contributionReceiptDate
    }));

    const securityHoldings = profileData.secData?.currentHoldings?.map(holding => ({
        ticker: holding.ticker,
        name: holding.name,
        sharesOwned: holding.sharesOwned,
        sharePrice: holding.sharePrice,
        totalValue: holding.totalValue
    }));

    const InsiderFilings : InsiderFiling[] = profileData.secData?.insiderFilings?.filings?.map(filing => {
        
        const _filing: InsiderFiling = {
        id: filing.id,
        accessionNumber: filing.accessionNumber,
        filedAt: filing.filedAt,
        documentType: filing.documentType,
        periodOfReport: filing.periodOfReport,
        notSubjectToSection16: filing.notSubjectToSection16,
        footnotes: JSON.stringify(filing.footnotes),
        transactions: filing.transactions?.map(transaction => ({
            securityTitle: transaction.securityTitle,
            transactionDate: transaction.transactionDate,
            formType: transaction.coding.formType,
            code: transaction.coding.code,
            equitySwapInvolved: transaction.coding.equitySwapInvolved,
            shares: transaction.amounts.shares,
            sharesFootnoteId: transaction.amounts.sharesFootnoteId,
            pricePerShare: transaction.amounts.pricePerShare,
            acquiredDisposedCode: transaction.amounts.acquiredDisposedCode,
            sharesOwnedFollowingTransaction: transaction?.postTransactionAmounts?.sharesOwnedFollowingTransaction,
            sharesOwnedFollowingTransactionFootnoteId: transaction?.postTransactionAmounts?.sharesOwnedFollowingTransactionFootnoteId,
            ownershipNature: transaction.ownershipNature
        })),
        issuerName: filing.issuer?.name || '',
        issuerTicker: filing.issuer?.tradingSymbol,
        issuerCik: filing.issuer?.cik || '',
        reportingOwnerName: filing.reportingOwner?.name,
        reportingOwnerCik: filing.reportingOwner?.cik,
        reportingOwnersIsDirector: filing.reportingOwner?.relationship.isDirector,
        reportingOwnersIsOfficer: filing.reportingOwner?.relationship.isOfficer,
        reportingOwnersIsTenPercentOwner: filing.reportingOwner?.relationship.isTenPercentOwner,
        reportingOwnersIsOther: filing.reportingOwner?.relationship.isOther,
        reportingOwnersOfficerTitle: filing.reportingOwner?.relationship.officerTitle,
    } as unknown as InsiderFiling;
        return _filing;
    }).filter((filing) => filing !== undefined) as InsiderFiling[];


    const prismaProfile: PrismaProfile = {
        id: profile.id ?? '',
        prospectId: profile.prospectId ?? '',
        data: (typeof profile.data === "string" ? profile.data : JSON.stringify(profile.data)),
        netWorth: profile.netWorth ?? 0,
        givingScore: profile.givingScore ?? 'U',
        givingCapacity: profile.givingCapacity ?? 0,
        properties: properties as unknown as ProfileProperty[],
        politicalContributions: politicalContributions,
        securityHoldings: securityHoldings,
        insiderFilings: InsiderFilings,
    } as unknown as PrismaProfile;

    return prismaProfile;
}

/**
 * 
 * @param prismaProfile The Prisma profile object to adapt. It should be type PrismaProfile, but type checking is freaking out.
 * @returns 
 */
export function adaptPrismaToModel(prismaProfile: any): ProspectProfile {
    const data = typeof prismaProfile.data === "string" ? JSON.parse(prismaProfile.data) : prismaProfile.data;

    console.log("Adapting Prisma profile to model format", prismaProfile);

    console.log("Properties in Prisma profile:", data.properties);

    const propertyData = (data.propertyData as any[] | undefined)?.map(property => ({
        address: property.address,
        identifier: property.identifier,
        marketTotalValue: property.marketTotalValue,
        mailingAddress: property.mailingAddress
    })) || [];

    const politicalContributions = (prismaProfile.politicalContributions as any[] | undefined)?.map(contribution => ({
        candidateId: contribution.candidateId,
        committee: {
            id: contribution.committeeId,
            name: contribution.committeeName,
            type: contribution.committeeType,
            state: contribution.committeeState,
            city: contribution.committeeCity,
            zip: contribution.committeeZip,
            createdAt: contribution.committeeCreatedAt,
            cycle: contribution.committeeCycle,
            party: contribution.committeeParty
        },
        candidateName: contribution.candidateName,
        candidateLastName: contribution.candidateLastName,
        candidateMiddleName: contribution.candidateMiddleName,
        contributionReceiptAmount: contribution.contributionReceiptAmount,
        contributorFirstName: contribution.contributorFirstName,
        contributorLastName: contribution.contributorLastName,
        contributorAddress: {
            addressOne: contribution.contributorAddressOne,
            addressTwo: contribution.contributorAddressTwo,
            city: contribution.contributorCity,
            state: contribution.contributorState,
            zip: contribution.contributorZip
        },
        contributorEmployer: contribution.contributorEmployer,
        contributorOccupation: contribution.contributorOccupation,
        contributionReceiptDate: contribution.contributionReceiptDate
    })) || [];

    const currentHoldings = (prismaProfile.securityHoldings as any[] | undefined)?.map(holding => ({
        ticker: holding.ticker,
        name: holding.name,
        sharesOwned: holding.sharesOwned,
        sharePrice: holding.sharePrice,
        totalValue: holding.totalValue
    })) || [];

    const insiderFilings = (prismaProfile.insiderFilings as any[] | undefined)?.map(filing => ({
        id: filing.id,
        accessionNumber: filing.accessionNumber,
        filedAt: filing.filedAt,
        documentType: filing.documentType,
        periodOfReport: filing.periodOfReport,
        notSubjectToSection16: filing.notSubjectToSection16,
        footnotes: JSON.parse(filing.footnotes || '[]'),
        transactions: filing.transactions?.map(transaction => ({
            securityTitle: transaction.securityTitle,
            transactionDate: transaction.transactionDate,
            coding: {
                formType: transaction.formType,
                code: transaction.code,
                equitySwapInvolved: transaction.equitySwapInvolved
            },
            amounts: {
                shares: transaction.shares,
                sharesFootnoteId: transaction.sharesFootnoteId,
                pricePerShare: transaction.pricePerShare,
                acquiredDisposedCode: transaction.acquiredDisposedCode
            },
            postTransactionAmounts: {
                sharesOwnedFollowingTransaction: transaction.sharesOwnedFollowingTransaction,
                sharesOwnedFollowingTransactionFootnoteId: transaction.sharesOwnedFollowingTransactionFootnoteId
            },
            ownershipNature: transaction.ownershipNature
        })),
        issuer: {
            name: filing.issuerName,
            tradingSymbol: filing.issuerTicker,
            cik: filing.issuerCik
        },
        reportingOwner: {
            name: filing.reportingOwnerName,
            cik: filing.reportingOwnerCik,
            relationship: {
                isDirector: filing.reportingOwnersIsDirector,
                isOfficer: filing.reportingOwnersIsOfficer,
                isTenPercentOwner: filing.reportingOwnersIsTenPercentOwner,
                isOther: filing.reportingOwnersIsOther,
                officerTitle: filing.reportingOwnersOfficerTitle
            }
        }
    })) || [];

    const secData = {
        currentHoldings,
        insiderFilings: { filings: insiderFilings, totalFilings: insiderFilings.length }
    };


    const profile: ProspectProfile = {
        id: prismaProfile.id,
        prospectId: prismaProfile.prospectId,
        createdAt: prismaProfile.createdAt,
        data: {
            ...data,
            propertyData,
            politicalContributions,
            secData
        },
        netWorth: prismaProfile.netWorth || 0,
        givingScore: prismaProfile.givingScore || 'U',
        givingCapacity: prismaProfile.givingCapacity || 0,
    };

    console.log("the summary data:", data.summary);

    console.log("Adapted profile:", profile);
    return profile;
}