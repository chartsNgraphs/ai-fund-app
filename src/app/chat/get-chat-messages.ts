"use server";

import { verifySession } from '../login/session';
import { PrismaClient } from '@prisma/client';

export async function getChatMessages(conversationId?: number) {
  const client = new PrismaClient();
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

    client.$disconnect();
    console.log('messages', messages)

    return messages || [];
}