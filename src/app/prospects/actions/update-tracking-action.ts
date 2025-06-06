'use server';

import { repo } from "@/repository/prospect-repository";
import { checkAuth } from "@/utils/check-auth";

export default async function updateTrackingAction(prospectId: string, trackingStatus: boolean, refreshSequenceId?: string): Promise<{ success: boolean }> {

    if (trackingStatus !== true && trackingStatus !== false) {
        throw new Error("Invalid tracking status. It should be either true or false.");
    }

    const prospectRepository = repo;

    // Get the session from the server
    const session = await checkAuth();
    if (!session || !session.user) {
        return {
            success: false
        };
    }

    // check if the user is the owner of the prospect
    const prospect = await prospectRepository.getById(prospectId);
    if (!prospect) {
        return {
            success: false
        };
    }
    if (prospect.userId !== (session.user as unknown as any).id) {
        return {
            success: false
        };
    }

    try {
        const updatedProspect = await prospectRepository.update(prospectId, {tracked: trackingStatus, refreshSeriesId: refreshSequenceId});

        if (!updatedProspect) {
            return {
                success: false
            };
        }

        return {
            success: true
        };
    } catch (error) {
        console.error("Error updating tracking status: ", error);
        return {
            success: false
        };
    }
}