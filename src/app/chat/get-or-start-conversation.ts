"use server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "../login/session";
import { revalidatePath } from "next/cache";

/**
 * Gets a conversation if there's a currently active one (based on the conversationId cookie) or starts a new one.
 * @param forceNewConversation (boolean): If true, a new conversation will be created whether an existing conversation exists or not.
 * @returns Promise<string>: The conversationId of the conversation.
 */
export async function getOrStartConversation(
    forceNewConversation: boolean = false,
    existingId?: number
): Promise<string> {
  const { userId, isAuth } = await verifySession();
  const client = new PrismaClient();
  if (!userId || !isAuth) {
    return "";
  }

  if (existingId) {
    (await cookies()).set("conversationId", existingId.toString(), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    // set any active conversations to inactive
    await client.conversation.updateMany({
      where: {
        userId: userId,
        status: "ACTIVE",
      },
      data: {
        status: "INACTIVE",
      },
    });

    // update updated at time
    await client.conversation.update({
      where: {
        id: existingId,
      },
      data: {
        updatedAt: new Date(),
        status: "ACTIVE",
      },
    });

    revalidatePath("/chat");
    client.$disconnect();
    return existingId.toString();
  }

  let conversationId = (await cookies()).get("conversationId")?.value;

  if (forceNewConversation) {
    conversationId = undefined;
    // set all conversations to inactive
    await client.conversation.updateMany({
      where: {
        userId: userId,
      },
      data: {
        status: "INACTIVE",
      },
    });
  }
  // TODO: Check if conversationId is valid and the user is the owner of the conversation.

  if (conversationId) {
    return conversationId;
  }

  conversationId = (
    await client.conversation.create({
      data: {
        userId: userId,
        status: "ACTIVE",
        messages: {
          create: [],
        },
      },
    })
  ).id.toString();

  (await cookies()).set("conversationId", conversationId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  client.$disconnect();
  revalidatePath("/chat");
  return conversationId;
}
