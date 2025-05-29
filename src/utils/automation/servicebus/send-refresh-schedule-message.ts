"use server";

import { v4 } from "uuid";
import AutoRefreshServiceBusClient from "./auto-refresh-client";

interface RefreshMessageBody {
    prospectId: string;
    recurring: boolean;
    refreshSeriesId?: string;
}

interface RefreshRequestOutcome {
    success: boolean;
    seriesId: string;
}

export default async function sendRefreshScheduleMessage(
    messageBody: RefreshMessageBody,
) : Promise<RefreshRequestOutcome> {
    const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
    const queueName = process.env.AZURE_SERVICE_BUS_QUEUE_NAME;
    if (!connectionString || !queueName) {
        console.error("Service Bus connection string or queue name is not defined.");
        throw new Error("Service Bus connection string or queue name is not defined.");
    }

    const seriesId = v4();

    messageBody = {
        ...messageBody,
        refreshSeriesId: seriesId, // Add a unique message ID
    }

    try {
        const serviceBusClient = new AutoRefreshServiceBusClient(connectionString, queueName);
        await serviceBusClient.sendMessage(messageBody, process.env.DELAY_MESSAGE === "true");
        console.log("Message sent to Service Bus queue:", messageBody);
        return {
            success: true,
            seriesId: seriesId,
        };
    } catch (error) {
        console.error("Error sending message to Service Bus queue:", error);
        return {
            success: false,
            seriesId: seriesId,
        };
    }
}