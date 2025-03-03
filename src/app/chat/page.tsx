import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChatMessages } from "./get-chat-messages";
import { sendChatMessage } from "./send-chat-message";
import ChatMessageDisplay from "./chat-message-display";

import { cookies } from "next/headers";
import RestartButton from "./restart-button";

export default async function ChatPage() {

    const existingConversationIdFromCookies = (await cookies()).get('conversationId');
    
    
    const existingMessages = (await getChatMessages(Number(existingConversationIdFromCookies?.value)))?.map(
        (message) => ({
            id: message.id,
            sender: message.role,
            message: message.text,
        })
    ) || [];



    return (
        <div
        className="container mx-auto p-4 flex flex-col justify-between h-full"
        style={{ height: "calc(100vh - 5rem)" }}
        >
        <div className="w-full flex flex-col h-full">
            <div className="w-full flex justify-right items-right m-4">
            <RestartButton />
            </div>
            <ChatMessageDisplay messages={existingMessages} />
            <form className="flex justify-center mt-4">
            <Input name="message" className="w-full border border-gray-200 rounded-lg p-2 text-lg" />
            <Button formAction={sendChatMessage} className="text-white rounded-lg p-2 ml-2 text-lg">
                Send
            </Button>
            </form>
        </div>
        </div>
    );
}
