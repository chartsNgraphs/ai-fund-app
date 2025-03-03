'use client';
import { restartConversation } from "./restart-conversation";
import { Button } from "@/components/ui/button";


export default function RestartButton() {
    return (
        <Button onClick={restartConversation} variant={'secondary'}>New Chat</Button>
    );
}