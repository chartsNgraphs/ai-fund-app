'use server';

import { repo } from "@/repository/prospect-repository";
import { ProspectProfile } from "@/model/prospects/prospect-profile";
import { refreshProspectProfile } from "./helpers/refresh";
import { checkAuth } from "@/utils/check-auth";

/**
 * SERVER ACTION: Refreshes the profile data for a given prospect.
 * @param id 
 * @returns 
 */
export async function refreshProfileDataAction(id: string): Promise<{ profile: ProspectProfile | null, success: boolean }> {
    const prospectRepository = repo;

    const session = await checkAuth();
    if (!session || !session.user) {
        throw new Error("Session not found. Cannot refresh profile data.");
    }

    // Get the prospect from the database
    const prospect = await prospectRepository.getById(id);
    if (!prospect) {
        return {
            profile: null,
            success: false
        };
    }

    if (!prospect.userId || (prospect.userId !== (session.user as unknown as any).id)) {
        throw new Error("Unauthorized access to this prospect");
    }

    try {
        const result = await refreshProspectProfile(id, false, prospect); // Automated is false since this is a manual refresh action.
        if (!result.success) {
            return {
                profile: null,
                success: false
            };
        } else {
            return {
                profile: result.profile,
                success: true
            };
        }
    } catch (error) {
        console.error("Error building profile: ", error);
        return {
            profile: null,
            success: false
        };
    }
}



