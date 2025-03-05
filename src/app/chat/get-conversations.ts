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
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
                select: {
                    createdAt: true,
                },
            },
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 50,
    });

    // Add createdAt of the most recent message to each conversation
    conversations.forEach(conversation => {
        conversation.updatedAt = conversation.messages[0]?.createdAt || null;
    });

    client.$disconnect();
    return conversations;
}