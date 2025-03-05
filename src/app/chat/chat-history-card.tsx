
"use client";
import { Card } from "@/components/ui/card";
import { rehydrateConversation } from "./rehydrate-conversation";
import { Conversation, ConversationStatus } from "@prisma/client";

export default function ChatHistoryCard({ conversation } : { conversation: Conversation }) {
    return (
        <Card 
            onClick={() => rehydrateConversation(conversation.id.toString())} 
            className={`p-4 cursor-pointer ${conversation.status === ConversationStatus.ACTIVE ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100'}`}
        >
            <h4 className="font-bold">{conversation.updatedAt?.toLocaleString() || 'No messages in conversation'}</h4>
            <p className="text-sm">{`Started at: ${conversation.createdAt.toLocaleString()}`}</p>
        </Card>
    )
}