'use server';

import { Prospect } from "@/model/prospects/prospect";
import ProspectRepository from "@/repository/prospect-repository";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { getProfile } from "@/app/services/build-profile-service";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "@/model/profiles/events";

/**
 * Server action to create the prospect from the form data
 * @param data FormData
 */
export default async function createProspectAction(data: FormData): Promise<{ prospect: Prospect, success: boolean }> {
    const prospectRepository = new ProspectRepository();

    // Get the session from the server
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }

    // create the prospect object from the form data
    const prospect: Prospect = {
        id: uuidv4(),
        userId: (session.user as unknown as any).id,
        firstName: data.get("firstName")?.toString()!,
        lastName: data.get("lastName")?.toString()!,
        dateOfBirth: new Date(Date.parse(data.get("dateOfBirth") as string)),
        email: data.get("email")?.toString()!,
        phone: data.get("phone")?.toString()!,
        tracked: false, // TODO: allow user to set this on the form.
        addresses: data.get("addresses") ? JSON.parse(data.get("addresses") as string) : [],
        socials: (data.get("socials") ? JSON.parse(data.get("socials") as string) : []).map((social: any) => {
            return {
                url: social,
                type: social.type || "linkedin",
            }}),
    };

    if (!prospect.firstName || !prospect.lastName) {
        return {
            prospect: prospect,
            success: false
        }
    }
    
    try {
        const profile = await buildProfile(prospect);

        const events = profile.events || [];
        
        // TODO: use the profile adapter to convert the events to the correct format instead of this.
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

        prospect.profiles = [
            {
                data: JSON.stringify(profile),
            }
        ]
        prospect.events = eventsMapped
    }
    catch (error) {
        console.error("Error building profile: ", error);
        return {
            prospect: prospect,
            success: false
        }
    }
    

    const createResult = await prospectRepository.create(prospect);
    if (!createResult.success) {
        return {
            prospect: prospect,
            success: false
        }
    }

    return {
        prospect: prospect,
        success: true
    }

}

async function buildProfile(prospect: Prospect): Promise<any> {
    const profile = await getProfile(prospect).then((result) => {
        return result;
    }).catch((error) => {
        console.error("Error building profile: ", error);
        return null;
    });

    if (!profile) {
        throw new Error("Error building profile");
    }

    return profile;
}