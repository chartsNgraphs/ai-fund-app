'use server';

import RecentlyViewed from "@/components/homepage/recently-viewed/recently-viewed";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WelcomeIcon from "./welcome-icon";

export default async function AuthenticatedHomePage() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    
    const user = session.user;
    const firstName = user?.name?.split(" ")[0] || "";

    const welcomeMessage = firstName!== "" ?
        `Welcome, ${firstName}!`:
        "Welcome back!";

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold"><span className="flex flex-row gap-2">{welcomeMessage} <WelcomeIcon/></span></h1>
            <RecentlyViewed />
        </div>
    );

}