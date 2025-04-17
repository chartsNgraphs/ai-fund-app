'use server';

import { getProfile } from "@/app/services/build-profile-service";
import ProspectProfileRepository from "@/repository/profile-repository";
import ProspectRepository from "@/repository/prospect-repository";
import { v4 as uuidv4 } from 'uuid';

import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";

import { ProspectProfile } from "@/model/prospects/prospect-profile";
import { ProfileAdapter } from "@/app/services/adapters/profile-adapter";
import { Event } from "@/model/profiles/events";

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

        
        const events = profile.events || [];

        const eventsMapped : Event[] = events.map((event: any) => {
            const isValidDate = (date: any) => !isNaN(new Date(date).getTime());

            return {
                id: event.id,
                prospectId: event.prospect_id,
                type: event.type,
                eventRaw: event.description || "",
                eventHtml: event.event_html || "",
                eventDate: isValidDate(event.event_date) ? new Date(event.event_date) : null,
                eventUrl: event.event_url || "",
                status: event.status ?? "",
            };
        });

        try {
            await prospectRepository.update(id, {
                events: eventsMapped,
            });
        }
        catch (error) {
            return {
                profile: null,
                success: false
            };
        }

        const updatedProfile = await prospectProfileRepository.create({
            id: uuidv4(),
            prospectId: id,
            data: JSON.stringify(profile),
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



