import { NextResponse } from 'next/server';
import { RefreshRequest } from '@/model/api/refresh-request';
import { refreshProspectProfile } from '@/app/prospects/actions/helpers/refresh';

/**
 * Refresh a prospect's profile data.
 * @param request - The request object containing the prospect ID and recurring flag.
 * @returns A JSON response indicating success or failure.
 */
export async function POST(request: Request) {
    const requestData: RefreshRequest = await request.json();
    const { prospectId, recurring } = requestData;

    if (!prospectId) {
        return NextResponse.json({ success: false, message: "Prospect ID is required." }, { status: 400 });
    }
    
    try {
        console.log("Refreshing profiles for prospect ID:", prospectId);
        const result = await refreshProspectProfile(prospectId);
        if (!result.success) {
            console.error("Failed to refresh profile data.");
            return NextResponse.json({ success: false, message: "Failed to refresh profile data." }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: "Profiles refreshed successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error refreshing profiles:", error);
        return NextResponse.json({ success: false, message: "Failed to refresh profiles." }, { status: 500 });
    }
}