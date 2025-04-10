'use server';

import RecentlyViewed from "@/components/homepage/recently-viewed/recently-viewed";

export default async function AuthenticatedHomePage() {

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <RecentlyViewed />
        </div>
    );

}