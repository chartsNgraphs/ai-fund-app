"use server";
import axios from 'axios';
import { Prospect } from '@/model/prospects/prospect';
import { DefaultSession, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-options';
import { ProfileAdapter } from './adapters/profile-adapter';

/**
 * The request body for the profile building service (python microservice).
 */
interface ProspectBuildRequest {
    user_id: string;
    name: string;
    address: string;
    previous_profile: string | null;
    address_full?: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
    };
    prospect_employer?: string;
}

/**
 * Calls the profile building service to get a new profile for the prospect.
 */
export async function getProfile(userId: string, prospect: Prospect): Promise<any> {

    if (!validateInput(prospect)) {
        throw new Error("Invalid input data for prospect profile building service");
    }

    const apiUrl: string = process.env["PROFILE_SERVICE_BASE_URL"] || ""; // Replace with your API URL

    const sortedProfiles = prospect.profiles?.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    ) || [];

    const data: ProspectBuildRequest = {
        user_id: userId,
        name: `${prospect.firstName} ${prospect.lastName}`,
        address: `${prospect.addresses[0].street} ${prospect.addresses[0].street2 || ""}, ${prospect.addresses[0].city}, ${prospect.addresses[0].state}`,
        previous_profile: JSON.stringify(ProfileAdapter.toApiData(sortedProfiles[0], userId, `${prospect.firstName} ${prospect.lastName}`, prospect.employer) || null,),
        address_full: {
            street: prospect.addresses[0].street,
            city: prospect.addresses[0].city,
            state: prospect.addresses[0].state,
            zip_code: prospect.addresses[0].zip,
        },
        prospect_employer: prospect.employer || undefined,
    };

    try {
        const response = await axios.post(`${apiUrl}/profile`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status} received from profile building service`);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

/**
 * Validates the input data for the prospect.
 * @param data The prospect data to validate
 * @returns 
 */
function validateInput(data: Prospect): boolean {
    return [
        data.firstName,
        data.lastName,
        data.id,
        data.addresses.length > 0 ? data.addresses[0].street : null,
    ].every((item) => !!item);
}