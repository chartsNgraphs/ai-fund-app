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
                    profiles: true, // Include profiles in the query
                }
            },);

        return results.map(result => ({
            ...result,
            addresses: result.addresses.map(address => ({
                ...address,
                street2: address.street2 || "", // Ensure street2 is always a string
            })),
            socials: result.socials.map(social => ({
                ...social,
                type: social.type || "linkedin", // Ensure type is always a string
            })),
            profiles: result.profiles.map(profile => ({
                ...profile,
                data: (profile.data as unknown as string), // Parse the data field
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
                profiles: true, // Include profiles in the query
            },
        });

        if (result) {
            return {
                ...result,
                addresses: result.addresses.map(address => ({
                    ...address,
                    street2: address.street2 || "", // Provide a default value for street2
                })),
                socials: result.socials.map(social => ({
                    ...social,
                    type: social.type || "linkedin", // Provide a default value for type
                })),
                profiles: result.profiles.map(profile => ({
                    ...profile,
                    data: (profile.data as unknown as string), // Parse the data field
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
    async create(prospect: Prospect): Promise<{prospect: Prospect, success: boolean}> {
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
                            url: social.url, // Ensure url is a string
                            type: social.type || "linkedin", // Ensure type is always a string TODO: use the value from form.
                        })),
                    },
                    profiles: {
                        create: prospect.profiles?.map(profile => ({
                            data: profile.data, // Ensure data is a string
                        })),
                    },

                },
                include: {
                    addresses: true,
                    socials: true,
                },
            });
        } catch (error) {
            return {
                prospect: prospect,
                success: false,
            };
        }

        return {
            prospect: prospect,
            success: true,
        };
    }

    /**
     * Update a prospect in the database
     * @param id The ID of the prospect to update
     * @param data The data to update the prospect with
     * @returns The updated prospect object or null if not found
     */
    async update(id: string, data: Partial<Prospect>): Promise<Prospect | null> {
        try {
            const { profiles, socials, ...updateData } = data; // Exclude profiles from being updated

            // Remove all existing socials and recreate them
            const updatedProspect = await this.prisma.prospect.update({
                where: { id },
                data: {
                    ...updateData,
                    socials: {
                        deleteMany: {}, // Delete all existing socials
                        create: socials?.map(social => ({
                            url: social.url,
                            type: social.type || "linkedin", // Ensure type is always a string
                        })),
                    },
                    addresses: updateData.addresses ? {
                        upsert: updateData.addresses.map(({prospectId, ...address}) => ({
                            where: { id: address.id },
                            update: address,
                            create: address,
                        })),
                    } : undefined,
                },
                include: {
                    addresses: true,
                    socials: true,
                    profiles: true,
                },
            });

            return {
                ...updatedProspect,
                addresses: updatedProspect.addresses.map(address => ({
                    ...address,
                    street2: address.street2 || "",
                })),
                socials: updatedProspect.socials.map(social => ({
                    ...social,
                    type: social.type || "linkedin",
                })),
                profiles: updatedProspect.profiles.map(profile => ({
                    ...profile,
                    data: (profile.data as unknown as string),
                })),
            };
        } catch (error) {
            console.error("Error updating prospect:", error);
            return null;
        }
    }

    /**
     * update the viewedAt field of a prospect.
     * @param prospectId the prospect Id.
     * @returns boolean
     */
    async view(prospectId: string): Promise<boolean> {
        try {
            await this.prisma.prospect.update({
                where: { id: prospectId },
                data: {
                    viewedAt: new Date(),
                },
            });
            return true;
        } catch (error) {
            console.error("Error updating viewedAt:", error);
            return false;
        }
    }

   /**
    * get Recently viewed prospects for a user.
    * @param userId The ID of the user
    * @returns 
    */
    async getRecentlyViewed(userId: string, count: number): Promise<Prospect[]> {
        const results = await this.prisma.prospect.findMany({
            where: {
                userId: userId,
                viewedAt: {
                    not: null,
                },
            },
            orderBy: {
                viewedAt: "desc",
            },
            take: count, // Limit the number of results to the specified count
            include: {
                addresses: false,
                socials: false,
                profiles: false,
            },
        });

        return results.map(result => ({
            ...result,
            addresses: [],
            socials: [],
            profiles: [],
        }));
    }


}