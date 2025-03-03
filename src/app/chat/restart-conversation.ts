import { startConversation } from "./start-conversation";

export async function restartConversation() {

    return await startConversation(true);
}