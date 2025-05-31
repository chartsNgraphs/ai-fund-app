import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/client";
import { ProspectProfile as InternalProspectProfile } from "@/model/prospects/prospect-profile";
import { adaptModelToPrisma } from "./adapters/profile-adapter";


/**
 * ProspectProfileRepository class to handle all the database operations related to prospect profiles.
 * It uses PrismaClient to interact with the database.
 */
export default class ProspectProfileRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
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
     * NOTE: prospectProfile must include properties, politicalContributions, securityHoldings, and insiderFilings arrays for nested creation.
     */
    async create(prospectProfile: InternalProspectProfile & {
        properties?: any[];
        politicalContributions?: any[];
        securityHoldings?: any[];
        insiderFilings?: any[];
    }): Promise<InternalProspectProfile> {
        const jsonData = (typeof prospectProfile.data === "string") ? prospectProfile.data : JSON.stringify(prospectProfile.data);

        const prismaProfile = adaptModelToPrisma(prospectProfile);

        const profileToSave = {
            ...prismaProfile,
            netWorth: prospectProfile.netWorth ?? undefined,
            givingScore: prospectProfile.givingScore?.toString() ?? 'U',
            givingCapacity: prospectProfile.givingCapacity,
            data: jsonData
        }
        
        const { id, prospectId, createdAt, updatedAt, ...profileData } = profileToSave;

        const result = await this.prisma.prospectProfile.create({
            data: {
                ...profileData,
                prospect: {
                    connect: { id: prospectProfile.prospectId },
                },
                data: jsonData, // TODO: remove this once the data field is removed from the model
                properties: prospectProfile.properties ? {
                    create: prospectProfile.properties.map((prop: any) => ({ ...prop }))
                } : undefined,
                politicalContributions: prospectProfile.politicalContributions ? {
                    create: prospectProfile.politicalContributions.map((contrib: any) => ({ ...contrib }))
                } : undefined,
                securityHoldings: prospectProfile.securityHoldings ? {
                    create: prospectProfile.securityHoldings.map((holding: any) => ({ ...holding }))
                } : undefined,
                insiderFilings: prospectProfile.insiderFilings ? {
                    create: prospectProfile.insiderFilings.map((filing: any) => ({ ...filing }))
                } : undefined,
            },
            include: {
                properties: true,
                politicalContributions: true,
                securityHoldings: true,
                insiderFilings: true,
            }
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