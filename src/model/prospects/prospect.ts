import { Address } from "../shared/address";

export interface Prospect {
    id?: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    addresses: Address[];
    socials: ProspectSocialLink[];
}

export interface ProspectSocialLink {
    id: string;
    prospectId: string;
    type?: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}