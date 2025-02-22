'use server';

import { createSession } from "./session";
import { FormState } from "./definitions";
import { client } from "@/prisma/prisma-client";
import { redirect } from "next/dist/server/api-utils";


export async function register(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(formData);

    if (!email) {
        return { ...state, errors: { email: ['Email is required.'] } };
    }
    
    console.log('checking email', email);
    // check if email already exists
    const existingUser = await client.user.findUnique({
        where: {
            email,
        },
    });

    console.log('existingUser', existingUser);

    if (existingUser) {
        await createSession(existingUser.id);
        // return { ...state, errors: { email: ['Email is already in use.'] } }; TODO: RE-ENABLE
    }

    console.log('creating user', email);

    const user = await client.user.create({
        data: {
            email,
            password,
            id: '12345',
            name: 'John Doe'
        },
    });

    console.log('user', user);

    await createSession(user.id);
    return { ...state, errors: {

    } };
}