import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChatMessages } from "./get-chat-messages";
import { sendChatMessage } from "./send-chat-message";
import ChatMessageDisplay from "./chat-message-display";
import { Send } from "lucide-react";
import { cookies } from "next/headers";
import ChatControls from "./chat-controls";
import { getConversationHistory } from "./get-conversations";
import ChatHistoryCard from "./chat-history-card";

export default async function ChatPage() {
  const existingConversationIdFromCookies = (await cookies()).get(
    "conversationId"
  );

  const existingMessages =
    (
      await getChatMessages(Number(existingConversationIdFromCookies?.value))
    )?.map((message) => ({
      id: message.id,
      sender: message.role,
      message: message.text,
    })) || [];

    const chatHistory = await getConversationHistory();

    const chatHistoryDisplay = chatHistory.reverse().map((conversation) => {
        return (
            <ChatHistoryCard key={conversation.id} conversation={conversation} />
        )
    });

    return (
        <div
            className="container mx-auto p-4 flex flex-row justify-between h-full"
            style={{ height: "calc(100vh - 5rem)" }}
        >
            <div className="w-1/4 h-full p-4 hidden sm:block">
                {/* Placeholder for past chat history */}
                <h2 className="text-xl font-bold mb-4">Research History</h2>
                {/* Add your chat history component or logic here */}
                <div className="space-y-4">
                    {chatHistoryDisplay}
                </div>
                
            </div>
            <div className="w-full sm:w-3/4 flex flex-col h-full">
                <div className="w-full flex justify-right items-right m-4">
                    <ChatControls />
                </div>
                <ChatMessageDisplay messages={existingMessages} />
                <form className="flex justify-center mt-4 mb-5">
                    <Input
                        name="message"
                        className="w-full border border-gray-200 rounded-lg p-2 text-lg"
                    />
                    <Button
                        formAction={sendChatMessage}
                        className="text-white rounded-lg p-2 ml-2 text-lg"
                    >
                        Send
                        <Send />
                    </Button>
                </form>
            </div>
        </div>
    );
}
