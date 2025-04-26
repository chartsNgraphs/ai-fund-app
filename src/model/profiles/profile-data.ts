import { Event } from "./events";
import { PropertyData } from "./property-data";
import { SECData } from "./sec-data";
import { PoliticalContribution } from "./political-contribution";
import { ProfileSummary } from "./summary";

export interface ProfileData {
    userId: string;
    address: string;
    prospectName: string;
    propertyData: PropertyData[];
    secData?: SECData,
    politicalContributions?: PoliticalContribution[];
    summary?: ProfileSummary;
}