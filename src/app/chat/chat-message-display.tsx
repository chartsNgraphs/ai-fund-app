type message = {
    id: number;
    sender: string;
    message: string;
}

export default function ChatMessageDisplay({ messages }: Readonly<{ messages: message[] }>) {

    return (
        <div className="flex-grow border w-full border-gray-200 rounded-lg overflow-y-auto flex flex-col justify-end p-4 space-y-4">
        {messages.map((message) => (
            <div
                key={message.id}
                className={`p-2 chat-bubble ${message.sender === "user" ? "text-right user bg-primary text-primary-foreground" : "text-left assistant bg-secondary text-secondary-foreground"}`}
            >
                <div>
                    {message.message}
                </div>
            </div>
        ))}
    </div>
    )

}