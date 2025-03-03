"use server";

import { client } from '@/prisma/prisma-client';
import { verifySession } from '../login/session';

export async function getChatMessages(conversationId?: number) {
  "use server";

  const user = verifySession();
  if (!user) {
    return null;
  }

  if (!conversationId) {
    console.log('No existing conversation id found');
    return [];
}
    console.log('conversationId', conversationId);
    

    const messages = await client.message.findMany({
        where: {
        conversationId: conversationId,
        },
    });

    console.log('messages', messages)

    return messages || [];
}