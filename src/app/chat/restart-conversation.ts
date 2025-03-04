import { getOrStartConversation } from "./get-or-start-conversation";

export async function restartConversation() {

    return await getOrStartConversation(true);
}