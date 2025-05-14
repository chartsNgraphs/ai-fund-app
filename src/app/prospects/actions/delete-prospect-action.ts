"use server";

import ProspectRepository from "@/repository/prospect-repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth-options";

export default async function deleteProspectAction(id: string): Promise<{ success: boolean }> {
    const prospectRepository = new ProspectRepository();

    // Get the session from the server
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }

    // Check if the user owns the prospect
    const prospect = await prospectRepository.getById(id);
    if (!prospect || prospect.userId !== (session.user as any).id) {
        throw new Error("Unauthorized access to this prospect");
    }

    try {
        const deletedProspect = await prospectRepository.delete(id);

        if (!deletedProspect) {
            return {
                success: false
            };
        }

        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting prospect: ", error);
        return {
            success: false
        };
    }
}