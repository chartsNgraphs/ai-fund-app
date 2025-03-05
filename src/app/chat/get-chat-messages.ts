"use server";

import { verifySession } from "../login/session";
import { PrismaClient } from "@prisma/client";

export async function getChatMessages(conversationId?: number) {
  "server only";
  const client = new PrismaClient();
  const user = await verifySession();
  if (!user) {
    return null;
  }

  if (!conversationId) {
    console.log("No existing conversation id found");
    return [];
  }

  // check that the conversationId is owned by the user
  const conversation = await client.conversation.findFirst({
    where: {
      id: conversationId,
      userId: user.userId,
    },
  });

  if (!conversation) {
    console.log("Conversation not found or not owned by user");
    return [];
  }

  console.log("conversationId", conversationId);

  const messages = await client.message.findMany({
    where: {
      conversationId: conversationId,
    },
  });

  client.$disconnect();
  console.log("messages", messages);

  return messages || [];
}
