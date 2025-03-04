/**
 * @fileoverview RestartConversation client component.
 */
'use client';
import { restartConversation } from "./restart-conversation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ChatControls() {
    /**
     * Restart the conversation.
     */
    return (
        <Button onClick={restartConversation} variant={'outline'}>
            <Plus />
            New Chat
        </Button>
    );
}