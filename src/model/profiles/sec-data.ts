// TODO: add separate types for filings.

export interface FilingEntity {
    companyName: string;
    cik: string;
    fileNo: string;
    stateOfIncorporation: string;
    sic: string;
}

export interface Filing {
    id: string;
    ticker: string;
    formType: string;
    accessionNumber: string;
    cik: string;
    companyName: string;
    companyLongName: string;
    description: string;
    linkToText: string;
    filedAt: Date;
    periodOfReport: Date;
    linkToHtml: string;
    linkToFilingDetails: string;
    entities: FilingEntity[];
}

export interface SECData {
    insiderFilings: {
        filings: Filing[];
        totalFilings: number;
    };
}
