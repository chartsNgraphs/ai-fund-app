'use server';

import ProspectRepository from "@/repository/prospect-repository";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { ProspectProfile } from "@/model/prospects/prospect-profile";
import { refreshProspectProfile } from "./helpers/refresh";
import { checkAuth } from "@/utils/check-auth";

export async function refreshProfileDataAction(id: string): Promise<{ profile: ProspectProfile | null, success: boolean }> {
    const prospectRepository = new ProspectRepository();

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
        const result = await refreshProspectProfile(id, prospect);
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



