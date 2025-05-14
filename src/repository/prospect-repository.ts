import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { Prospect } from "@/model/prospects/prospect";
import prisma from "@/prisma/client";

export interface QueryResult {
    count: number;
    prospects: Prospect[];
}

/**
 * ProspectRepository class to handle all the database operations related to prospects.
 * It uses PrismaClient to interact with the database.
 */
export default class ProspectRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    /**
     * Get all prospects for a user
     * @param userId The ID of the user
     * @returns An array of prospects for the user
     */
    async getAll(
        userId,
        query: string = "",
        page: number = 1,
        pageSize: number = 25,
    ): Promise<QueryResult> {

        console.log("ProspectRepository.getAll", userId, query, page, pageSize);

        let results = await this.prisma.prospect.findMany(
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
                    events: true, // Include events in the query
                    additionalPersons: true, // Include additional individuals in the query
                }
            },);

        // Filter results based on the query string
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            results =  results.filter((result) => {
                const fullName = `${result.firstName} ${result.lastName}`.toLowerCase();
                return fullName.includes(lowerCaseQuery) || result.email.toLowerCase().includes(lowerCaseQuery);
            });
        }

        const count = results.length;

        // return the correct page of results
        const startIndex = (page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        results = results.slice(startIndex, endIndex);

        return {
            prospects: results.map(result => ({
            ...result,
            employer: result.employer || undefined, // Convert null to undefined for employer
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
            events: result.events.map(event => ({
                ...event,
                eventDate: new Date(event.eventDate), // Ensure eventDate is a Date object
                viewedAt: event.viewedAt || undefined, // Convert null to undefined for viewedAt
            })),
            additionalPersons: result.additionalPersons.map(individual => ({
                ...individual,
                dateOfBirth: individual.dateOfBirth.toISOString() || "", // Ensure dateOfBirth is always a string
                relationship: individual.relationship, // Map relationship to relationShip
            })),
        })),
            count: count,
        };

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
                profiles: true,
                events: true,
                additionalPersons: true,
            },
        });

        if (result) {
            return {
                ...result,
                employer: result.employer || undefined, // Convert null to undefined for employer
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
                events: result.events.map(event => ({
                    ...event,
                    eventDate: new Date(event.eventDate), // Ensure eventDate is a Date object
                    viewedAt: event.viewedAt || undefined, // Convert null to undefined for viewedAt
                })),
                additionalPersons: result.additionalPersons.map(individual => ({
                    ...individual,
                    dateOfBirth: individual.dateOfBirth.toISOString() || "", // Ensure dateOfBirth is always a string
                    relationship: individual.relationship, // Map relationship to relationShip
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
                    additionalPersons: {
                        create: prospect.additionalPersons?.map(individual => ({
                            firstName: individual.firstName, // Ensure firstName is a string
                            lastName: individual.lastName, // Ensure lastName is a string
                            dateOfBirth: new Date(individual.dateOfBirth), // Ensure dateOfBirth is a Date object
                            relationship: individual.relationship, // Ensure relationship is a string
                        })),
                    },
                    events: {
                        create: prospect.events?.map(event => ({
                            type: event.type, // Ensure type is a string
                            eventRaw: event.eventRaw, // Ensure eventRaw is a string
                            eventHtml: event.eventHtml, // Ensure eventHtml is a string
                            eventDate: event.eventDate, // Ensure eventDate is a Date object
                            eventUrl: event.eventUrl, // Ensure eventUrl is a string
                            status: event.status, // Ensure status is a string
                            summary: event.summary, // Ensure summary is a string
                            tags: event.tags, // Ensure tags is an array of strings
                        })),
                    }

                },
                include: {
                    addresses: true,
                    socials: true,
                },
            });
        } catch (error) {
            console.error("Error creating prospect:", error);
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
            const { profiles, socials, additionalPersons, addresses, ...updateData } = data; // Exclude profiles and socials from being updated

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
                    addresses: addresses ? {
                        // deleteMany: {
                        //     id: {
                        //         notIn: addresses.map(address => address.id || v4()),
                        //     },
                        // },
                        upsert: addresses.map(({ prospectId, ...address }) => ({
                            where: { id: address.id || v4() },
                            update: address,
                            create: address,
                        })),
                    } :{},
                    additionalPersons: additionalPersons ? {
                        deleteMany: {
                            id: {
                                notIn: additionalPersons.map(individual => individual.id || v4()),
                            },
                        },
                        upsert: additionalPersons.map(({ prospectId, ...individual }) => ({
                            where: { id: individual.id || v4() }, // Use a unique identifier for the individual
                            update: {
                                ...individual,
                                dateOfBirth: new Date(individual.dateOfBirth), // Convert string date to Date object
                            },
                            create: {
                                ...individual,
                                dateOfBirth: new Date(individual.dateOfBirth), // Convert string date to Date object
                            },
                        })),
                    } : {
                        deleteMany: {},
                    },
                    events: updateData.events ? {
                        upsert: updateData.events.map(({ prospectId, ...event }) => ({
                            where: { id: event.id || v4() }, // Use a unique identifier for the event
                            update: {
                                ...event,
                                eventDate: new Date(event.eventDate), // Convert string date to Date object
                            },
                            create: {
                                ...event,
                                eventDate: new Date(event.eventDate), // Convert string date to Date object
                            },
                        })),
                    } : undefined,
                },
                include: {
                    addresses: true,
                    socials: true,
                    profiles: true,
                    events: true, // Include events in the query
                } as const, // Ensure TypeScript infers the correct type for included fields
            });

            return {
                ...updatedProspect,
                employer: updatedProspect.employer || undefined, // Convert null to undefined for employer
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
                events: updatedProspect.events.map(event => ({
                    ...event,
                    eventDate: new Date(event.eventDate),
                    viewedAt: event.viewedAt || undefined,
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
                addresses: true,
                socials: false,
                profiles: false,
            },
        });

        return results.map(result => ({
            ...result,
            employer: result.employer || undefined, // Convert null to undefined for employer
            addresses: result.addresses.map(address => ({
                ...address,
                street2: address.street2 || "", // Ensure street2 is always a string
            })),
            socials: [],
            profiles: [],
        }));
    }

    /**
     * Delete a prospect by ID
     * @param id The ID of the prospect to delete
     * @returns True if the prospect was deleted successfully, false otherwise
     */
    async delete(id: string): Promise<boolean> {
        try {
            await this.prisma.prospect.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            console.error("Error deleting prospect:", error);
            return false;
        }
    }

}