import { ProfileData } from "@/model/profiles/profile-data"
import { PropertyData } from "@/model/profiles/property-data";
import { Filing, SECData } from "@/model/profiles/sec-data";;
import { Event } from "@/model/profiles/events";

/**
 * ProfileAdapter class to handle the conversion of profile data from string to ProfileData object.
 */
export class ProfileAdapter {

    /**
     * Converts a string representation of profile data to a ProfileData object.
     * @param string The string representation of the profile data.
     * @returns The ProfileData object.
     */
    static toProfileData(string: string): {data: ProfileData, events: Event[]} {

        let result = JSON.parse(string.toString() as unknown as string);
        while (typeof result !== 'object') {
            result = JSON.parse(result);
        }

        const propertyData: PropertyData[] = result?.['property_data']?.map((data: any) => ({
            address: data.address,
            identifier: data.identifier,
            marketTotalValue: data.market_total_value,
            mailingAddress: data.mailing_address,
        }));

        const secData = result['sec_data']

        const eventsData = result['events']

        let events: Event[] = [];
        if (eventsData) {
            events = eventsData.map((event: any) => {
                return{
                id: event.id,
                prospectId: event.prospect_id,
                type: event.type,
                eventRaw: event.event_raw,
                eventHtml: event.event_html,
                eventDate: new Date(event.event_date),
                eventUrl: event.event_url,
                status: event.status,
                viewedAt: event.viewed_at ? new Date(event.viewed_at) : undefined,
                createdAt: new Date(event.created_at),
            }});
        }

        let secDataComplete: SECData | undefined = undefined;

        if (secData) {
            secDataComplete = {
                insiderFilings: {
                    filings: secData.insider_filings.filings.map((filing: any) => {
                        const f: Filing = {
                            id: filing.id,
                            ticker: filing.ticker,
                            formType: filing.form_type,
                            accessionNumber: filing.accession_number,
                            cik: filing.cik,
                            companyName: filing.company_name,
                            companyLongName: filing.company_name_long,
                            description: filing.description,
                            linkToText: filing.link_to_txt,
                            filedAt: new Date(filing.filed_at),
                            periodOfReport: new Date(filing.period_of_report),
                            linkToHtml: filing.link_to_html,
                            linkToFilingDetails: filing.link_to_filing_details,
                            entities: filing.entities?.map((entity: any) => ({
                                companyName: entity.company_name,
                                cik: entity.cik,
                                fileNo: entity.file_no,
                                stateOfIncorporation: entity.state_of_incorporation,
                                sic: entity.sic,
                            }))
                        }
                        return f;
                    }),
                    totalFilings: secData.insider_filings.total_filings,
                }
            }
        }

        return {
            data: {
            userId: result.user_id,
            address: result.address,
            prospectName: result.prospect_name,
            propertyData: propertyData,
            secData: secDataComplete,
        },
            events: events,
        };
    }
}