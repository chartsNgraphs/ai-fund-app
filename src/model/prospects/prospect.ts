import { Address } from "../shared/address";

export interface Prospect {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    addresses: Address[];
    }