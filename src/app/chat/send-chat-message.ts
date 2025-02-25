import { revalidatePath } from "next/cache";
import { existingMessages } from "./get-chat-messages";


export async function sendChatMessage(formData: FormData) {
    "use server";

    console.log('sending message', formData.get('message'));
    existingMessages.push({
        id: existingMessages.length + 1,
        message: formData.get('message') as string,
        sender: 'user',
    })

    existingMessages.push({
        id: existingMessages.length + 1,
        message: 'I am a bot, I do not understand',
        sender: 'bot',
    })

    revalidatePath('/chat');
}