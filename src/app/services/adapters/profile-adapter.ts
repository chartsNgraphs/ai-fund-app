import { ProfileData } from "@/model/profiles/profile-data"
import { PropertyData } from "@/model/profiles/property-data";
import { Filing, SECData } from "@/model/profiles/sec-data";
import { ProspectProfile } from "@prisma/client";

/**
 * ProfileAdapter class to handle the conversion of profile data from string to ProfileData object.
 */
export class ProfileAdapter {

    /**
     * Converts a string representation of profile data to a ProfileData object.
     * @param string The string representation of the profile data.
     * @returns The ProfileData object.
     */
    static toProfileData(string: string): ProfileData {

        console.log("string", string, typeof string);

        let result = JSON.parse(string.toString() as unknown as string);
        while (typeof result !== 'object') {
            result = JSON.parse(result);
        }

        console.log("result", result, typeof result);

        const propertyData: PropertyData[] = result?.['property_data']?.map((data: any) => ({
            address: data.address,
            identifier: data.identifier,
            marketTotalValue: data.market_total_value,
            mailingAddress: data.mailing_address,
        }));

        const secData = result['sec_data']

        let secDataComplete: SECData | undefined = undefined;

        if (secData) {
            secDataComplete = {
                insiderFilings: {
                    filings: secData.insider_filings.filings.map((filing: any) => {
                        console.log("filing", filing)
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
            userId: result.user_id,
            address: result.address,
            prospectName: result.prospect_name,
            propertyData: propertyData,
            secData: secDataComplete
        };
    }
}