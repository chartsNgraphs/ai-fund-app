"use server";
import { UserSettings } from '@/model/users/user';
import UserRepository from '@/repository/user-repository';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-options';

export async function getSearchHistory(userId: string): Promise<string[]> {
    const userRepository = new UserRepository();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || userId !== (session.user as unknown as any).id) {
        throw new Error("Session not found");
    }

    const user = await userRepository.getById(userId);

    return (user?.settings?.recentSearches || []).slice(0, 5) || [];
}

export async function addSearchToHistory(search: string): Promise<void> {
    console.log("Adding search to history from action", search);
    const searchTerm = search;
    if (!searchTerm || searchTerm.length < 3) {
        return;
    }

    const userRepository = new UserRepository();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }

    const userId = (session.user as unknown as any).id;

    const user = await userRepository.getById(userId);

    console.log("Existing user setttings:", user?.settings, typeof user?.settings);

    if (user && user.settings) {

        let recentSearches = user.settings.recentSearches || [];

        console.log("Current recent searches:", recentSearches, typeof recentSearches);

        if (!recentSearches?.includes(searchTerm)) {
            recentSearches = [searchTerm, ...recentSearches].slice(0, 5);
        } else {
            recentSearches = recentSearches.filter((term) => term !== searchTerm).slice(0, 4);
            recentSearches = [searchTerm, ...recentSearches];
        }

        const updatedSettings: UserSettings = {
            ...user.settings,
            recentSearches: recentSearches,
        };

        await userRepository.update(userId, {}, updatedSettings);
    }
}