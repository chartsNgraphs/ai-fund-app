"use server";

import ProspectRepository from "@/repository/prospect-repository";
import { checkAuth } from "@/utils/check-auth";

export default async function deleteProspectAction(id: string): Promise<{ success: boolean }> {
    const prospectRepository = new ProspectRepository();

    const session = await checkAuth();
    if (!session) {
        return {
            success: false
        };
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