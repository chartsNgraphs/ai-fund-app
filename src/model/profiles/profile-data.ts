import { PropertyData } from "./property-data";
import { SECData } from "./sec-data";

export interface ProfileData {
    userId: string;
    address: string;
    prospectName: string;
    propertyData: PropertyData[];
    secData?: SECData
}