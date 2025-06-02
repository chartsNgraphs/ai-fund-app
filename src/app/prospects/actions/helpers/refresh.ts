import { getProfile } from "@/app/services/build-profile-service";
import ProspectProfileRepository from "@/repository/profile-repository";
import  { repo } from "@/repository/prospect-repository";
import { ProfileAdapter } from "@/app/services/adapters/profile-adapter";
import { Prospect } from "@/model/prospects/prospect";
import { v4 as uuidv4 } from 'uuid';
import { ProspectProfile } from "@/model/prospects/prospect-profile";

/**
 * Refreshes the prospect profile data.
 * DO NOT USE AS A SERVER ACTION. THIS IS A HELPER FUNCTION.
 * This function is intended to be used in server actions or other server-side contexts.
 * @param id - The ID of the prospect.
 * @param prospect - The prospect object (optional). Include if you already have it.
 * @returns An object containing the updated profile and success status.
 */
export async function refreshProspectProfile(id: string, automated: boolean, prospect?: Prospect, refreshSeriesId?: string): Promise<{ profile: ProspectProfile | null, success: boolean, cancelled?: boolean }> {
        const prospectRepository = repo
        const prospectProfileRepository = new ProspectProfileRepository();
        prospect = (prospect || await prospectRepository.getById(id)) || undefined;
        if (!prospect) {
            return {
                profile: null,
                success: false,
                cancelled: false
            };
        }

        if (automated) {
            if (!prospect.tracked) {
                return {
                    profile: null,
                    success: false,
                    cancelled: true
                };
            }
            if (prospect.refreshSeriesId !== refreshSeriesId) {
                return {
                    profile: null,
                    success: false,
                    cancelled: true
                };
            }
        } 

        const profile = await getProfile(prospect.userId, prospect);
        const profileData = ProfileAdapter.toProfileData(profile);
        const events = profileData.events || [];
        const summary = profileData.data.summary || null;

        try {
            await prospectRepository.update(id, {
                events: events,
            });
        }
        catch (error) {
            return {
                profile: null,
                success: false,
                cancelled: false
            };
        }

        const { previous_profile, ...filteredProfile } = profile;
        const updatedProfile = await prospectProfileRepository.create({
            id: uuidv4(),
            prospectId: id,
            data: ProfileAdapter.toProfileData(filteredProfile).data,
            netWorth: summary?.netWorth,
            givingScore: summary?.givingScore,
            givingCapacity: summary?.givingCapacity
        });

        return {
            profile: {
                ...updatedProfile,
                id: updatedProfile.id!,
                prospectId: updatedProfile.prospectId!,
            },
            success: true,
            cancelled: false
        };

}