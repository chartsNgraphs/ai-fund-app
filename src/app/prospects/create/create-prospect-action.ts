'use server';

import { Prospect } from "@/model/prospects/prospect";
import ProspectRepository from "@/repository/prospect-repository";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Server action to create the prospect from the form data
 * @param data FormData
 */
export default async function createProspectAction(data: FormData) {
    const prospectRepository = new ProspectRepository();

    // Get the session from the server
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }

    console.log("Session: ", session);

    // create the prospect object from the form data
    const prospect: Prospect = {
        userId: (session.user as unknown as any).id,
        firstName: data.get("firstName")?.toString()!,
        lastName: data.get("lastName")?.toString()!,
        dateOfBirth: new Date(Date.parse(data.get("dateOfBirth") as string)),
        email: data.get("email")?.toString()!,
        phone: data.get("phone")?.toString()!,
        addresses: data.get("addresses") ? JSON.parse(data.get("addresses") as string) : [],
        socials: data.get("socials") ? JSON.parse(data.get("socials") as string) : [],
    };

    prospectRepository.create(prospect).then((prospect) => {
        console.log("Prospect created: ", prospect);
    }).catch((error) => {
        console.error("Error creating prospect: ", error);
    }
    )

    redirect("/prospects");


}