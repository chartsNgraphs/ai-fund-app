type message = {
    id: number;
    sender: string;
    message: string;
}

export default function ChatMessageDisplay({ messages }: Readonly<{ messages: message[] }>) {

    return (
        <div className="flex-grow border w-full border-gray-200 rounded-lg overflow-y-auto flex flex-col text-lg justify-end p-4 space-y-4">
        {messages.map((message) => (
            <div className={`flex ${message.sender === "USER" ? "justify-end" : "justify-start"}`} key={message.id}>
                <div
                    className={`chat-bubble ${message.sender === "USER" ? "text-right user  text-secondary-foreground" : "text-left assistant bg-secondary text-secondary-foreground"}`}
                >
                    <div>
                        {message.message}
                    </div>
                </div>
            </div>
        ))}
    </div>
    )

}