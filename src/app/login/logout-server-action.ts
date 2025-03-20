'use server';
// TODO: Remove this file, it's not needed
import { deleteSession } from "./session";

export async function logout() {
    await deleteSession();
    return { success: true };
}