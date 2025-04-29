/**
 * ProspectProfile interface represents the profile of a prospect.
 */
export interface ProspectProfile {
    id?: string;
    prospectId?: string;
    data: string;
    createdAt?: Date;
    updatedAt?: Date;
    netWorth?: number | null;
    givingScore?: string;
    givingCapacity?: number;
}