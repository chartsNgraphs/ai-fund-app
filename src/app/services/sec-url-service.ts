import axios from "axios";
import { notFound } from "next/navigation";

export class SecUrlService {


    secUrl: string;
    secKey: string | undefined;

    constructor() {
        
        this.secUrl = "https://api.sec-api.io";
        this.secKey = process.env.SEC_API_KEY;

        if (!this.secKey) {
            throw new Error("SEC_API_KEY could not be found in environment variables");
        }   
    }

    async getUrl(ticker: string, accessionNo: string): Promise<string> {
        const params = {
            query: `accessionNo: "${accessionNo}" AND ticker: "${ticker}"`,
            from: "0",
            size: "1",
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${this.secKey}`,
            "accept": "application/json",
        }

        const response = await axios.post(`${this.secUrl}`, params, { headers });
        if (response.status !== 200) {
            throw new Error(`Error fetching SEC URL: ${response.statusText}`);
        }
        const data = response.data;
        console.log("SEC URL data:", data);
        const url = data['filings']?.[0]?.['linkToFilingDetails']
        if (!url) {
            console.warn(`No URL found for ticker: ${ticker} and accession number: ${accessionNo}`);
            notFound();
        }
        return url;
    }

}