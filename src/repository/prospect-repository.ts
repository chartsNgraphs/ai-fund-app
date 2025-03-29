import { PrismaClient } from "@prisma/client";

import { Prospect } from "@/model/prospects/prospect";

/**
 * ProspectRepository class to handle all the database operations related to prospects.
 * It uses PrismaClient to interact with the database.
 */
export default class ProspectRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Get all prospects for a user
     * @param userId The ID of the user
     * @returns An array of prospects for the user
     */
    async getAll(
        userId
    ): Promise<Prospect[]> {
        const results = await this.prisma.prospect.findMany(
            {
                where: {
                    userId: userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    addresses: true,
                    socials: true,
                }
            },);

        return results.map(result => ({
            ...result,
            addresses: result.addresses.map(address => ({
                ...address,
                street2: address.street2 || "", // Ensure street2 is always a string
            })),
        }));
    }

    /**
     * Get a prospect by ID
     * @param id The ID of the prospect
     * @returns The prospect object or null if not found
     */
    async getById(id: string): Promise<Prospect | null> {
        const result = await this.prisma.prospect.findUnique({
            where: { id },
            include: {
                addresses: true,
                socials: true,
            },
        });

        if (result) {
            return {
                ...result,
                addresses: result.addresses.map(address => ({
                    ...address,
                    street2: address.street2 || "", // Provide a default value for street2
                })),
            };
        }

        return null;
    }

    /**
     * Create a new prospect in the database
     * @param prospect The prospect object to create
     * @returns True if the prospect was created successfully, false otherwise
     */
    async create(prospect: Prospect): Promise<Boolean> {
        console.log("Creating prospect: ", prospect);
        // console.log(this.prisma.prospect);
        try {
            await this.prisma.prospect.create({
                data: {
                    ...prospect,
                    userId: prospect.userId, // Ensure userId is set correctly
                    // Removed user property as it is not expected in the data object
                    addresses: {
                        create: prospect.addresses,
                    },
                    socials: {
                        create: prospect.socials.map(social => ({
                            ...social,
                            type: social.type || "", // Ensure type is always a string
                        })),
                    },
                },
                include: {
                    addresses: true,
                    socials: true,
                },
            });
        } catch (error) {
            console.error("Error creating prospect: ", error);
            return false;
        }

        return true;
    }

}