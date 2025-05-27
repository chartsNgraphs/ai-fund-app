import axios from "axios";
import { notFound } from "next/navigation";
import { SecIntegrationService } from "./integration/sec-integration-service";

export class SecUrlService {
    secIntegrationService: SecIntegrationService;

    constructor(
        private secKey: string | undefined = process.env.SEC_API_KEY,
        private secUrl: string = "https://api.sec-api.io",
    ) {
        if (!this.secKey) {
            throw new Error("SEC_API_KEY could not be found in environment variables");
        }

        this.secIntegrationService = new SecIntegrationService(this.secKey, this.secUrl);
    }

    async getUrl(ticker: string, accessionNo: string): Promise<string> {
        const query: string = `accessionNo: "${accessionNo}" AND ticker: "${ticker}"`

        let response;

        try {
            response = await this.secIntegrationService.execute(query, 0, 1);
        } catch (error) {
            console.error("Error fetching SEC data:", error);
            notFound();
        }

        const data = response.data;

        const url = data['filings']?.[0]?.['linkToFilingDetails']
        if (!url) {
            console.warn(`No URL found for ticker: ${ticker} and accession number: ${accessionNo}`);
            notFound();
        }
        return url;
    }

}