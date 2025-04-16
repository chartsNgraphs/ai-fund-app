import { ProspectProfile } from "./prospect-profile";
import { Address } from "../shared/address";

export interface Prospect {
    id?: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    tracked: boolean;
    addresses: Address[];
    socials: ProspectSocialLink[];
    profiles?: ProspectProfile[];
}

export interface ProspectSocialLink {
    id: string;
    prospectId: string;
    type?: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}