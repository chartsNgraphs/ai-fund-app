import { PrismaClient } from "@prisma/client";

import { ProspectProfile as InternalProspectProfile } from "@/model/prospects/prospect-profile";


/**
 * ProspectProfileRepository class to handle all the database operations related to prospect profiles.
 * It uses PrismaClient to interact with the database.
 */
export default class ProspectProfileRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Get all profiles for a prospect
     * @param prospectId The ID of the prospect
     * @returns An array of prospect profiles for the prospect
     */
    async getAll(prospectId: string): Promise<InternalProspectProfile[]> {
        const results = await this.prisma.prospectProfile.findMany({
            where: {
                prospectId: prospectId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return results.map(result => ({
            ...result,
            netWorth: result.netWorth ?? undefined,
            givingScore: result.givingScore ?? undefined,
            givingCapacity: result.givingCapacity ?? undefined,
            data: JSON.parse(result.data as unknown as string),
        }));
    }

    /**
     * Create a new prospect profile
     * @param prospectProfile The prospect profile object to create
     */
    async create(prospectProfile: InternalProspectProfile): Promise<InternalProspectProfile> {

        console.log("prospectProfile", prospectProfile, typeof prospectProfile);

        const jsonData = (typeof prospectProfile.data === "string") ? prospectProfile.data : JSON.stringify(prospectProfile.data);

        console.log("jsonData", jsonData);

        const profileToSave = {
            netWorth: prospectProfile.netWorth ?? undefined,
            givingScore: prospectProfile.givingScore?.toString() ?? 'U',
            givingCapacity: prospectProfile.givingCapacity,
            data: jsonData,
        }
        
        const result = await this.prisma.prospectProfile.create({
            data: {
                ...profileToSave,
                prospect: {
                    connect: { id: prospectProfile.prospectId },
                },
            },
        });
        
        return {
            ...result,
            netWorth: result.netWorth ?? undefined,
            givingScore: result.givingScore ?? undefined,
            givingCapacity: result.givingCapacity ?? undefined,
            data: JSON.parse(result.data as unknown as string),
        };
    }
}