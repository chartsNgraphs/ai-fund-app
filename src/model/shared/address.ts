export interface Address {
    id: string;
    prospectId?: string;
    street: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    createdAt: Date;
    updatedAt: Date;
}