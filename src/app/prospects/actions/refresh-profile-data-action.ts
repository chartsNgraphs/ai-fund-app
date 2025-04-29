'use server';

import { getProfile } from "@/app/services/build-profile-service";
import ProspectProfileRepository from "@/repository/profile-repository";
import ProspectRepository from "@/repository/prospect-repository";
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { ProspectProfile } from "@/model/prospects/prospect-profile";
import { ProfileAdapter } from "@/app/services/adapters/profile-adapter";

export async function refreshProfileDataAction(id: string): Promise<{ profile: ProspectProfile | null, success: boolean }> {
    const prospectRepository = new ProspectRepository();
    const prospectProfileRepository = new ProspectProfileRepository();

    // Get the session from the server
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
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
        const profile = await getProfile(prospect);

        // console.log("Profile data: ", profile);

        const profileData = ProfileAdapter.toProfileData(profile);
        const events = profileData.events || [];
        const summary = profileData.data.summary || null;
        
        console.log("Summary: ", summary);

        try {
            await prospectRepository.update(id, {
                events: events,
            });
        }
        catch (error) {
            return {
                profile: null,
                success: false
            };
        }

        const { previous_profile, ...filteredProfile } = profile;
        const updatedProfile = await prospectProfileRepository.create({
            id: uuidv4(),
            prospectId: id,
            data: filteredProfile,
            netWorth: summary?.netWorth,
            givingScore: summary?.givingScore,
            givingCapacity: summary?.givingCapacity,
        });

        return {
            profile: updatedProfile,
            success: true
        };
    } catch (error) {
        console.error("Error building profile: ", error);
        return {
            profile: null,
            success: false
        };
    }
}



