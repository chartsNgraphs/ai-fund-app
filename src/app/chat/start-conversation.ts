"use server";
import { cookies } from "next/headers";
import { client } from "@/prisma/prisma-client";
import { verifySession } from "../login/session";
import { revalidatePath } from "next/cache";

export async function startConversation(
    forceNewConversation: boolean = false
): Promise<string> {
  const { userId, isAuth } = await verifySession();

  if (!userId || !isAuth) {
    return "";
  }

  let conversationId = (await cookies()).get("conversationId")?.value;

  if (forceNewConversation) {
    conversationId = undefined;
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

  revalidatePath("/chat");
  return conversationId;
}
