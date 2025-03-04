'use server';
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { verifySession } from "@/app/login/session";
import { getOrStartConversation } from "./get-or-start-conversation";


export async function sendChatMessage(formData: FormData) {
    "server only";
    const client = new PrismaClient();
    console.log('sending message', formData.get('message'));
    const user = await verifySession();
    if (!user) {
        return;
    }

    const conversationId: string = await getOrStartConversation();

    const message = formData.get('message') as string;
    if (!message) {
        return;
    }

    await client.message.createMany({
        data: [
            {
                conversationId: parseInt(conversationId),
                text: message,
                role: 'USER',
            },
            {
                conversationId: parseInt(conversationId),
                text: 'Hello, how can I help you today?',
                role: 'ASSISTANT',
                suggestedResponses: [
                    'I need help with my account',
                    'I need help with my order',
                    'I need help with something else',
                ],
            }
        ]
    }).catch((error) => {
        console.error('Error sending messages', error);
    });
    
    revalidatePath('/chat');
}