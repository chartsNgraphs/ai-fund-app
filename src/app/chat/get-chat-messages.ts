export const existingMessages = [
    {
      id: 1,
      message: "Hello, how can I help you?",
      sender: "bot",
    },
    {
      id: 2,
      message: "I need help with my order",
      sender: "user",
    },
  ];

export async function getChatMessages(conversationId?: string) {
    
    console.log('conversationId', conversationId);
    return existingMessages;
}