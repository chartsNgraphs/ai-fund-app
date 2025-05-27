export interface User {
    id: string;
    email: string;
    image: string | null;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSettingsData {
    [key: string]: any; // Replace with actual settings structure if known
}

export interface UserSettings {
    id: string;
    userId: string;
    settings: UserSettingsData;
    createdAt?: Date;
    updatedAt?: Date;
    recentSearches: string[]; // Array of recent search strings
}