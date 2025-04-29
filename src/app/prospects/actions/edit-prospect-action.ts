"use server";

import { Prospect } from "@/model/prospects/prospect";
import ProspectRepository from "@/repository/prospect-repository";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";

/**
 * Server action to edit an existing prospect from the form data
 * @param id The ID of the prospect to edit
 * @param data FormData
 */
export default async function editProspectAction(id: string, data: FormData): Promise<{ prospect: Prospect | null, success: boolean }> {
    const prospectRepository = new ProspectRepository();

    // Get the session from the server
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }

    // create the prospect object from the form data
    const updatedData: Partial<Prospect> = {
        firstName: data.get("firstName")?.toString(),
        lastName: data.get("lastName")?.toString(),
        dateOfBirth: data.get("dateOfBirth") ? new Date(Date.parse(data.get("dateOfBirth") as string)) : undefined,
        email: data.get("email")?.toString(),
        phone: data.get("phone")?.toString(),
        addresses: data.get("addresses") ? JSON.parse(data.get("addresses") as string) : undefined,
        employer: data.get("employer")?.toString(),
        socials: data.get("socials") ? JSON.parse(data.get("socials") as string).map((social: any) => ({
            url: social,
            type: social.type || "linkedin",
        })) : undefined,
        additionalPersons: data.get("additionalPersons") ? JSON.parse(data.get("additionalPersons") as string) : undefined,
    };

    if (!updatedData.firstName || !updatedData.lastName) {
        return {
            prospect: null,
            success: false
        };
    }

    try {
        const updatedProspect = await prospectRepository.update(id, updatedData);

        if (!updatedProspect) {
            return {
                prospect: null,
                success: false
            };
        }

        return {
            prospect: updatedProspect,
            success: true
        };
    } catch (error) {
        console.error("Error updating prospect: ", error);
        return {
            prospect: null,
            success: false
        };
    }
}