import { ServiceBusClient } from "@azure/service-bus";
import { v4 } from "uuid";

class AutoRefreshServiceBusClient {
    client;
    queueName;

    constructor(connectionString, queueName) {
        this.client = new ServiceBusClient(connectionString);
        this.queueName = queueName;
    }

    async sendMessage(messageBody) {
        const sender = this.client.createSender(this.queueName);
        const message = { messageId: v4(), body: messageBody };
        try {
            await sender.sendMessages(message);
        } finally {
            await sender.close();
        }
    }

    async deleteMessage(receivedMessage) {
        const receiver = this.client.createReceiver(this.queueName);
        try {
            await receiver.completeMessage(receivedMessage);
        } finally {
            await receiver.close();
        }
    }

    async close() {
        await this.client.close();
    }
}

export default AutoRefreshServiceBusClient;
