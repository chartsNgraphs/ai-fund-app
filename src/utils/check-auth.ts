"use server";

import { authOptions } from "./auth-options";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

// This function checks if the user is authenticated and redirects to the login page if not
export async function checkAuth() : Promise<Session | void> {
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        // redirect to login page
        redirect("/login");
    }
    return session;
}

