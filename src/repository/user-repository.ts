import { User, UserSettings } from "@/model/users/user";
import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
/**
 * UserRepository class to handle all the database operations related to users.
 */
export default class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    /**
     * Get a user by ID, including their settings
     * @param id The ID of the user
     * @returns The user object with settings or null if not found
     */
    async getById(id: string): Promise<(User & { settings: UserSettings | null }) | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                settings: true,
                image: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (user) {
            return {
                ...user,
                settings: user.settings
                    ? {
                          ...user.settings,
                          settings: user.settings.settings as UserSettings["settings"],
                          recentSearches: (user.settings?.recentSearches?.['searches']) || [], // The casting is bc that JSONValue is actually correct already.
                      }
                    : null,
            };
        }

        return null;
    }

    /**
     * Update a user and their settings in the database
     * @param id The ID of the user to update
     * @param data The data to update the user with
     * @param settings The settings to update for the user
     * @returns The updated user object with settings or null if not found
     */
    async update(id: string, data: Partial<User>, settings?: Partial<UserSettings>): Promise<(User & { settings: UserSettings | null }) | null> {

        try {
            if (data) {
                await this.prisma.user.update({
                    where: { id },
                    data,
                    include: { settings: true },
                });
            }

            if (settings) {
                await this.prisma.userSettings.upsert({
                    where: { userId: id },
                    update: {
                        ...settings,
                        settings: {
                            ...settings.settings,
                        },
                        recentSearches: { searches: settings.recentSearches || [] },
                    },
                    create: { 
                        ...settings, 
                        userId: id, 
                        settings: {
                            ...settings.settings, 
                        },
                        recentSearches: { searches: settings.recentSearches || [] },
                    },
                });
            }

            const user = await this.prisma.user.findUnique({
                where: { id },
                include: { settings: true },
            });

            if (user) {
                return {
                    ...user,
                    settings: user.settings
                        ? {
                              ...user.settings,
                              settings: user.settings.settings as UserSettings["settings"],
                              recentSearches: user.settings?.recentSearches?.['searches'] || {searches: []},
                          }
                        : null,
                };
            }

            return null;
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }
}

export const userRepository = new UserRepository();