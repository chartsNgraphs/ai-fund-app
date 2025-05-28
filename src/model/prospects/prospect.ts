import { ProspectProfile } from "./prospect-profile";
import { Address } from "../shared/address";
import { Event } from "../profiles/events";

export interface Prospect {
    id?: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    tracked: boolean;
    refreshSeriesId?: string;
    addresses: Address[];
    socials: ProspectSocialLink[];
    profiles?: ProspectProfile[];
    events?: Event[];
    employer?: string;
    additionalPersons?: AdditionalPerson[];
}

export interface AdditionalPerson {
    id?: string;
    firstName: string;
    prospectId?: string;
    lastName: string;
    dateOfBirth: string;
    relationship: string;
}

export interface ProspectSocialLink {
    id: string;
    prospectId: string;
    type?: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}