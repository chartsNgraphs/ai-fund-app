/**
 * @fileoverview RestartConversation client component.
 */
'use client';
import { restartConversation } from "./restart-conversation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {  Clock, Plus } from "lucide-react";

export default function ChatControls({ historyCards }: { historyCards: React.ReactNode[] }) {
   
    historyCards = historyCards || [];
    return (
        <div className="flex flex-row space-x-4">
        <Button className='rounded-full' onClick={restartConversation} variant={'outline'}>
            <Plus />
            New Chat
        </Button>
        <div className="lg:hidden">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='rounded-full'  variant={'outline'}>
                    <Clock />
                    History
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" sideOffset={5} className="bg-white shadow-lg space-y-1 rounded-lg p-2 overflow-y-auto scrollbar w-350px" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                {
                    historyCards.map((card, index) => (
                        <DropdownMenuItem key={index}>
                            {card}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        </div>
    );
}