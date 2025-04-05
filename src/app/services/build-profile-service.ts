"use server";
import axios from 'axios';
import { Prospect } from '@/model/prospects/prospect';
import { DefaultSession, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-options';

interface ProspectBuildRequest {
    user_id: string;
    address: string;
}

/**
 * Calls the profile building service to get a new profile for the prospect.
 */
export async function getProfile(prospect: Prospect): Promise<any> {

    const session : DefaultSession | null = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }

    const userId = (session.user as unknown as any).id;
    if (!userId) {
        throw new Error("User ID not found in session");
    }

    const apiUrl: string = process.env["PROFILE_SERVICE_BASE_URL"] || ""; // Replace with your API URL

    const data: ProspectBuildRequest = {
        user_id: userId,
        address: `${prospect.addresses[0].street} ${prospect.addresses[0].street2 || ""}, ${prospect.addresses[0].city}, ${prospect.addresses[0].state}`,
    };

    console.log("Data to send: ", data);


    try {
        const response = await axios.post(`${apiUrl}/profile`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}
