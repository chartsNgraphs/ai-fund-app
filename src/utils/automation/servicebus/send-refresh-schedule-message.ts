"use server";
import { v4 } from "uuid";
import { ServiceBusClient } from "@azure/service-bus";

import AutoRefreshServiceBusClient from "./auto-refresh-client";

interface RefreshMessageBody {
    prospectId: string;
}

export default async function sendRefreshScheduleMessage(
    messageBody: RefreshMessageBody,
) : Promise<boolean> {
    const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
    const queueName = process.env.AZURE_SERVICE_BUS_QUEUE_NAME;
    if (!connectionString || !queueName) {
        console.error("Service Bus connection string or queue name is not defined.");
        throw new Error("Service Bus connection string or queue name is not defined.");
    }

    try {
        const serviceBusClient = new AutoRefreshServiceBusClient(connectionString, queueName);
        await serviceBusClient.sendMessage(messageBody);
        console.log("Message sent to Service Bus queue:", messageBody);
        return true;
    } catch (error) {
        console.error("Error sending message to Service Bus queue:", error);
        return false;
    }
}