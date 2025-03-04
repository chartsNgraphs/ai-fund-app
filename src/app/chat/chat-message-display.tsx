'use client';
import ActiveChatBubble from "@/components/chat/active-chat-bubble";
import { sendChatMessage } from "./send-chat-message";
import { useEffect } from "react";

export type message = {
    id: number;
    sender: string;
    message: string;
    suggestedResponses?: string[];
}

export default function ChatMessageDisplay({ messages }: Readonly<{ messages: message[] }>) {

    // Scroll to the bottm of the chat window
    useEffect(() => {
    const chatWindow = document.querySelector('#chat-display');
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }});

    return (
        <div id='chat-display' className="border h-full min-h-0 w-full border-gray-200 rounded-lg text-lg p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => {
            const isLastAssistantMessage = message.sender !== "USER" && index === messages.length - 1;
            return (
                <div key={message.id} className="w-full flex flex-col space-y-2">
                    <div className={`flex ${message.sender === "USER" ? "justify-end" : "justify-start"}`} >
                        {isLastAssistantMessage ? (
                            <ActiveChatBubble message={message} sendMessageFunction={sendChatMessage} />
                        ) : (
                            <div
                                className={`chat-bubble ${message.sender === "USER" ? "text-right user  text-secondary-foreground" : "text-left assistant bg-secondary text-secondary-foreground"}`}
                            >
                                <div>
                                    {message.message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        })}
    </div>
    )

}