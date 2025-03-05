'use client';
import { Badge } from "../ui/badge";
import { message } from "@/app/chat/chat-message-display";
import { useCallback } from "react";

export default function ActiveChatBubble({ message, sendMessageFunction }: { message: message, sendMessageFunction: (formData: FormData) => void }) {
    const handleBadgeClick = useCallback(async (response: string) => {
        const form_data = new FormData();
        form_data.append('message', response);
        await sendMessageFunction(form_data);
    }, []);

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="flex justify-start">
                <div className="chat-bubble text-left assistant bg-secondary text-secondary-foreground">
                    <div>
                        {message.message}
                    </div>
                </div>
            </div>
            <div className="flex justify-start space-x-2 ">
                {
                    message.suggestedResponses?.map((response, index) => (
                        <Badge variant={'default'} onClick={
                            () => handleBadgeClick(response)
                        } className="cursor-pointer p-1" key={index}>{response}
                        </Badge>
                    ))
                }
            </div>
        </div>
    )
}