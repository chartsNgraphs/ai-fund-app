"use server";
import { UserSettings, UserSettingsData } from '@/model/users/user';
import {userRepository} from '@/repository/user-repository';
import { v4 } from 'uuid';
import { checkAuth } from '@/utils/check-auth';

export async function getSearchHistory(userId: string): Promise<string[]> {

    const session = await checkAuth();
    if (!session) {
        return [];
    }

    const user = await userRepository.getById(userId);
    return (user?.settings?.recentSearches || []).slice(0, 5) || [];
}

export async function addSearchToHistory(search: string): Promise<void> {
    const searchTerm = search;
    if (!searchTerm || searchTerm.length < 3) {
        console.log("Search term is too short. Not adding to history.");
        return;
    }
    const session = await checkAuth();
    if (!session) {
        console.log("Session not found. Cannot add search to history.");
        return;
    }

    const userId = (session.user as unknown as any).id;
    const user = await userRepository.getById(userId);

    if (user) {
        let recentSearches = user.settings?.recentSearches || [];

        if (!recentSearches?.includes(searchTerm)) {
            recentSearches = [searchTerm, ...recentSearches].slice(0, 5);
        } else {
            recentSearches = recentSearches.filter((term) => term !== searchTerm).slice(0, 4);
            recentSearches = [searchTerm, ...recentSearches];
        }
        
        const updatedSettings: UserSettings = {
            ...user.settings,
            id: v4(),
            userId: user.id,
            recentSearches: recentSearches,
            settings: {} as unknown as UserSettingsData
        };
        await userRepository.update(userId, {}, updatedSettings);
    }
}