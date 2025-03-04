import { PrismaClient } from "@prisma/client";
import { verifySession } from "../login/session";

export async function getConversationHistory() {

    const userId = (await verifySession()).userId;

    if (!userId) {
        return [];
    }

    const client = new PrismaClient();

    const conversations = await client.conversation.findMany({
        where: {
            userId: userId,
        },
        include: {
            messages: true,
        },
    });

    client.$disconnect();
    return conversations;
}