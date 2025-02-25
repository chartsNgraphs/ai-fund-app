import { existingMessages } from "./get-chat-messages";

export async function newChat() {
    "use server";
    
    existingMessages.forEach((message) => {
        console.log(message);
    });
}