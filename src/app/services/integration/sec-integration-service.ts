import axios from "axios";

/**
 * * This class is responsible for interacting with the SEC API.

 */
export class SecIntegrationService {
    secUrl: string;
    secKey: string | undefined;

    /**
     * Constructor for the SecIntegrationService class.
     * @param secKey The SEC API key. If not provided, it will be fetched from the environment variables.
     * @param url The SEC API URL. Default is "https://api.sec-api.io".
     */
    constructor(
        secKey: string | undefined = process.env.SEC_API_KEY,
        url: string = "https://api.sec-api.io"
    ) {
        this.secUrl = url
        this.secKey = secKey;
    }

    /**
     * Executes a query against the SEC API.
     * @param query The query string to be executed.
     * @param from The starting index for the results. Default is 0.
     * @param size The number of results to return. Default is 1.
     * @returns A promise that resolves to the response from the SEC API.
     * @throws Will throw an error if the SEC API key is not found or if the request fails.
     */
    async execute(query: string, from: number = 0, size: number = 1): Promise<any> {
        if (!this.secKey) {
            throw new Error("SEC_API_KEY could not be found in environment variables");
        }
        const params = {
            query: query,
            from: from.toString(),
            size: size.toString(),
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${this.secKey}`,
            "accept": "application/json",
        }

        const response = await axios.post(`${this.secUrl}`, params, { headers });
        if (response.status !== 200) {
            throw new Error(`Error fetching SEC data: ${response.statusText}`);
        }

        return response;
    }
}

// TODO: Inject this service where it is used.