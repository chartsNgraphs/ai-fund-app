import { Button } from "@/components/ui/button";
import { getChatMessages } from "./get-chat-messages";
import { sendChatMessage } from "./send-chat-message";
import ChatMessageDisplay from "./chat-message-display";
import { Send } from "lucide-react";
import { cookies } from "next/headers";
import ChatControls from "./chat-controls";
import { getConversationHistory } from "./get-conversations";
import ChatHistoryCard from "./chat-history-card";
import { Textarea } from "@/components/ui/textarea";
import { message } from "./chat-message-display";

export default async function ChatPage() {
  const existingConversationIdFromCookies = (await cookies()).get(
    "conversationId"
  );

  const existingMessages: message[] =
    (
      await getChatMessages(Number(existingConversationIdFromCookies?.value))
    )?.map((message, index, array) => {
      if (message.role === "ASSISTANT" && index === array.length - 1) {
        return {
          id: message.id,
          sender: message.role,
          message: message.text,
          suggestedResponses: message.suggestedResponses,
        };
      } else {
        return {
          id: message.id,
          sender: message.role,
          message: message.text,
          suggestedResponses: [],
        };
      }
    }) || [];

  const chatHistory = await getConversationHistory();

  const chatHistoryDisplay = chatHistory.map((conversation) => {
    return (
      <ChatHistoryCard key={conversation.id} conversation={conversation} />
    );
  });

  return (
    <div
      className="container mx-auto p-4 flex flex-row justify-between h-full"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <div className="w-1/4 h-full p-4 hidden lg:block">
        {/* Placeholder for past chat history */}
        <h2 className="text-xl font-bold mb-4">Research History</h2>
        {/* Add your chat history component or logic here */}
        <div className="h-full space-y-4 overflow-y-auto scrollbar p-2">
          {chatHistoryDisplay}
        </div>
      </div>
      <div className="w-full lg:w-3/4 flex flex-col h-full">
        <div className="w-full flex justify-right items-right m-4">
          <ChatControls historyCards={chatHistoryDisplay} />
        </div>
        <ChatMessageDisplay messages={existingMessages} />
        <form name="chatInput" className="flex justify-center mt-4 mb-5">
          <Textarea
            name="message"
            className="w-full border border-gray-200 rounded-lg p-2 text-lg resize-none"
          />
          <Button
            formAction={sendChatMessage}
            className="text-white rounded-lg p-2 ml-2 h-full pl-7 pr-7 size-2xl"
          >
            <Send style={{ height: "50px" }} className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
