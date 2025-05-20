"use server";
import redi from "next/navigation";

import { SecUrlService } from "@/app/services/sec-url-service";


export default async function getSecUrl(ticker: string, accessionNo: string) {
    const secUrlService = new SecUrlService();
    try {
        const url = await secUrlService.getUrl(ticker, accessionNo);
        return url;

    } catch (error) {
        console.error("Error fetching SEC URL:", error);
        throw error;
    }
}