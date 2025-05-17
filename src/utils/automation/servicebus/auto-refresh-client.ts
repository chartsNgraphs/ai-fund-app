import { ServiceBusClient } from "@azure/service-bus";
import { v4 } from "uuid";

// Sends a message to the Service Bus queue
export async function sendMessage(connectionString, queueName, messageBody) {
    const client = await new ServiceBusClient(connectionString);
    const sender = client.createSender(queueName);
    const message = { messageId: v4(), body: messageBody };
    try {
        await sender.sendMessages(message);
    } finally {
        await sender.close();
        await client.close();
    }
}

// Deletes a message from the Service Bus queue
export async function deleteMessage(connectionString, queueName, receivedMessage) {
    const client = await new ServiceBusClient(connectionString);
    const receiver = client.createReceiver(queueName);
    try {
        await receiver.completeMessage(receivedMessage);
    } finally {
        await receiver.close();
        await client.close();
    }
}
