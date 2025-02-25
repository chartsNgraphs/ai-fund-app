import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChatMessages } from "./get-chat-messages";
import { sendChatMessage } from "./send-chat-message";
import ChatMessageDisplay from "./chat-message-display";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from "next/headers";

export default async function ChatPage() {

    const existingConversationIdFromCookies = (await cookies()).get('messageId');
    if (!existingConversationIdFromCookies) {
        console.log('No existing conversation id found');
        (await cookies()).set('messageId', uuidv4(), {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
        });
    }
    
    const existingMessages = await getChatMessages(existingConversationIdFromCookies?.value);

    return (
        <div
        className="container mx-auto p-4 flex flex-col justify-between h-full"
        style={{ height: "calc(100vh - 5rem)" }}
        >
        <div className="w-full flex flex-col h-full">
            <div className="w-full flex justify-right items-right m-4">
                <Button variant={'secondary'}>New Chat</Button>
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
