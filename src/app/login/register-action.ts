'use server';
// TODO: Remove this file, it's not needed. 
// use next-auth callback instead
import { createSession } from "./session";
import { FormState } from "./definitions";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

export async function register(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const client = new PrismaClient();

    if (!email) {
        return { ...state, errors: { email: ['Email is required.'] } };
    }

    // check if email already exists
    const existingUser = await client.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        await createSession(existingUser.id);
        // return { ...state, errors: { email: ['Email is already in use.'] } }; TODO: RE-ENABLE
    }

    const user = await client.user.create({
        data: {
            email,
            password,
            id: v4(),
            name: 'John Doe'
        },
    });

    await createSession(user.id);
    return { ...state, errors: {

    } };
}