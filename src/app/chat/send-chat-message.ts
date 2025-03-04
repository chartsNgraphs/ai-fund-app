import { revalidatePath } from "next/cache";
import { client, } from "@/prisma/prisma-client";
import { verifySession } from "@/app/login/session";
import { startConversation } from "./start-conversation";


export async function sendChatMessage(formData: FormData) {
    "use server";

    console.log('sending message', formData.get('message'));
    const user = await verifySession();
    if (!user) {
        return;
    }

    const conversationId: string = await startConversation();
    await client.message.createMany({
        data: [
            {
                conversationId: parseInt(conversationId),
                text: formData.get('message') as string,
                role: 'USER',
            },
            {
                conversationId: parseInt(conversationId),
                text: 'Hello, how can I help you today?',
                role: 'ASSISTANT',
            }
        ]
    }).catch((error) => {
        console.error('Error sending messages', error);
    });
    
    revalidatePath('/chat');
}