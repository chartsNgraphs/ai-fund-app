export interface Issuer {
    name: string;
    cik: string;
    tradingSymbol?: string;
}

export interface ReportingOwnerRelationship {
    isDirector: boolean;
    isOfficer: boolean;
    officerTitle?: string;
    isTenPercentOwner: boolean;
    isOther: boolean;
}

export interface ReportingOwner {
    name: string;
    cik: string;
    relationship: ReportingOwnerRelationship;
}

export interface Coding {
    formType: string;
    code: string;
    equitySwapInvolved: boolean;
}

export interface Amounts {
    shares: number;
    sharesFootnoteId?: string[];
    pricePerShare?: number;
    acquiredDisposedCode: string;
}

export interface PostTransactionAmounts {
    sharesOwnedFollowingTransaction: number;
    sharesOwnedFollowingTransactionFootnoteId?: string[];
}

export interface Transaction {
    securityTitle: string;
    transactionDate: Date;
    coding: Coding;
    amounts: Amounts;
    postTransactionAmounts?: PostTransactionAmounts;
    ownershipNature: Record<string, any>;
}

export interface SECFiling {
    id: string;
    accessionNumber: string;
    filedAt: Date;
    documentType: string;
    periodOfReport: string;
    notSubjectToSection16: boolean;
    footnotes?: Record<string, string>;
    transactions?: Transaction[];
    reportingOwner: ReportingOwner;
    issuer?: Issuer;
}

export interface InsiderFilings {
    filings?: SECFiling[];
    totalFilings?: number;
}

export interface SECData {
    version?: string;
    insiderFilings?: InsiderFilings;
}
