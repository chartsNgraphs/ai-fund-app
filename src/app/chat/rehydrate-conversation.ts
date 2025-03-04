'use client';

import { getOrStartConversation } from "./get-or-start-conversation";

export async function rehydrateConversation(conversationId: string) {
    await getOrStartConversation(false, parseInt(conversationId));
}