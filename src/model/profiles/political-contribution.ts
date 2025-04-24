export interface PoliticalCommittee {
    id: string; // Unique identifier for the political committee
    name: string; // Name of the political committee
    type: string; // Type of the political committee (e.g., PAC, party)
    state: string; // State where the political committee is registered
    city: string; // City where the political committee is registered
    zip: string; // ZIP code of the political committee's address
    createdAt: string; // Date when the political committee was created
    cycle: number; // Election cycle for which the committee is registered
    party: string; // Political party affiliation of the committee
}

export interface PoliticalContributionAddress {
    addressOne: string; // Address details of the contributor
    addressTwo: string; // Additional address information (if any)
    city: string; // City of the contributor
    state: string; // State of the contributor
    zip: string; // ZIP code of the contributor's address
}

export interface PoliticalContribution {
    candidateId: string; // Unique identifier for the candidate
    committee: PoliticalCommittee; // Details of the political committee making the contribution
    candidateName: string; // First name of the candidate receiving the contribution
    candidateLastName: string; // Last name of the candidate
    candidateMiddleName: string; // Middle name of the candidate
    contributionReceiptAmount: number; // Amount of the contribution received
    contributorFirstName: string; // First name of the contributor
    contributorLastName: string; // Last name of the contributor
    contributorAddress: PoliticalContributionAddress; // Address details of the contributor
    contributorEmployer: string; // Employer of the contributor
    contributorOccupation: string; // Occupation of the contributor
    contributionReceiptDate: string; // Date when the contribution was received
}