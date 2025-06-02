import { ProfileData } from "@/model/profiles/profile-data";
import { PropertyData } from "@/model/profiles/property-data";
import { SECData, SECFiling, Transaction, Coding, Amounts, PostTransactionAmounts, Issuer, ReportingOwner } from "@/model/profiles/sec-data";
import { Event } from "@/model/profiles/events";
import { ProfileSummary } from "@/model/profiles/summary";

/**
 * ProfileAdapter class to handle the conversion of profile data from string to ProfileData object.
 */
export class ProfileAdapter {

    /**
     * Converts a string representation of profile data to a ProfileData object.
     * @param string The string representation of the profile data.
     * @returns The ProfileData object.
     */
    static toProfileData(string: string | object): {data: ProfileData, events: Event[]} {
        
        let result;
        // Check if the input is already an object, if not, parse it as JSON
        if (typeof string === 'string') {
            result = JSON.parse(string.toString() as unknown as string);
            while (typeof result !== 'object') {
                result = JSON.parse(result);
            }
        } else {
            result = string;
        }

        const propertyData: PropertyData[] = result?.['property_data']?.map((data: any) => ({
            address: data.address,
            identifier: data.identifier,
            marketTotalValue: data.market_total_value,
            mailingAddress: data.mailing_address,
        }));

        const secData = result['sec_data'];

        const eventsData = result['events'];

        const politicalContributionsData = result['political_contributions'];

        const politicalContributions: any[] = politicalContributionsData ? politicalContributionsData.map((data: any) => ({
            candidateId: data.candidate_id,
            committee: {
                id: data.committee.id,
                name: data.committee.name,
                type: data.committee.type,
                state: data.committee.state,
                city: data.committee.city,
                zip: data.committee.zip,
                createdAt: data.committee.created_at,
                cycle: data.committee.cycle,
                party: data.committee.party,
            },
            candidateName: data.candidate_name,
            candidateLastName: data.candidate_last_name,
            candidateMiddleName: data.candidate_middle_name,
            contributionReceiptAmount: data.contribution_receipt_amount,
            contributorFirstName: data.contributor_first_name,
            contributorLastName: data.contributor_last_name,
            contributorAddress: {
                addressOne: data.contributor_address.address_one,
                addressTwo: data.contributor_address.address_two,
                city: data.contributor_address.city,
                state: data.contributor_address.state,
                zip: data.contributor_address.zip
            },
            contributorEmployer: data.contributor_employer,
            contributorOccupation: data.contributor_occupation,
            contributionReceiptDate: new Date(data.contribution_receipt_date),
        })) : [];

        let events: Event[] = [];
        if (eventsData) {
            events = eventsData.map((event: any) => {
            return {
                id: event.id || undefined,
                type: event.type || '',
                eventRaw: event.description || '',
                eventHtml: event.event_html || '',
                eventDate: event.event_date ? new Date(event.event_date) : undefined,
                eventUrl: event.event_url || '',
                status: event.status || '',
                summary: event.summary || '',
                tags: event.tags || [],
                viewedAt: event.viewed_at ? new Date(event.viewed_at) : undefined,
                createdAt: event.created_at ? new Date(event.created_at) : undefined,
            };
            });
        }

        let secDataComplete: SECData | undefined = undefined;

        if (secData) {
            secDataComplete = {
                version: '2',
                insiderFilings: {
                    filings: secData.insider_filings.filings.map((filing: any) => {
                        const transactions: Transaction[] = filing.transactions?.map((transaction: any) => ({
                            securityTitle: transaction.security_title,
                            transactionDate: new Date(transaction.transaction_date),
                            coding: {
                                formType: transaction.coding.form_type,
                                code: transaction.coding.code,
                                equitySwapInvolved: transaction.coding.equity_swap_involved,
                            },
                            amounts: {
                                shares: transaction.amounts.shares,
                                sharesFootnoteId: transaction.amounts.shares_footnote_id,
                                pricePerShare: transaction.amounts.price_per_share,
                                acquiredDisposedCode: transaction.amounts.acquired_disposed_code,
                            },
                            postTransactionAmounts: transaction.post_transaction_amounts ? {
                                sharesOwnedFollowingTransaction: transaction.post_transaction_amounts.shares_owned_following_transaction,
                                sharesOwnedFollowingTransactionFootnoteId: transaction.post_transaction_amounts.shares_owned_following_transaction_footnote_id,
                            } : undefined,
                            ownershipNature: transaction.ownership_nature,
                        }));

                        const reportingOwner : ReportingOwner = {
                            name: filing.reporting_owner?.name,
                            cik: filing.reporting_owner?.cik,
                            relationship: {
                                isOfficer: filing.reporting_owner?.relationship.is_officer,
                                isDirector: filing.reporting_owner?.relationship.is_director,
                                isTenPercentOwner: filing.reporting_owner?.relationship.is_ten_percent_owner,
                                isOther: filing.reporting_owner?.relationship.is_other,
                            }
                        }; 

                        const issuer: Issuer = {
                            name: filing.issuer?.name,
                            cik: filing.issuer?.cik,
                            tradingSymbol: filing.issuer?.trading_symbol,
                        };

                        const f: SECFiling = {
                            id: filing.id,
                            accessionNumber: filing.accession_number,
                            filedAt: new Date(filing.filed_at),
                            documentType: filing.document_type,
                            periodOfReport: filing.period_of_report,
                            notSubjectToSection16: filing.not_subject_to_section_16,
                            footnotes: filing.footnotes,
                            transactions: transactions,
                            reportingOwner: reportingOwner,
                            issuer: issuer,
                        };
                        return f;
                    }),
                    totalFilings: secData.insider_filings.total_filings,
                },
                currentHoldings: secData.current_holdings?.map((holding: any) => ({
                    name: holding.name,
                    ticker: holding.ticker,
                    sharesOwned: holding.shares_owned,
                    sharePrice: holding.share_price,
                    totalValue: holding.total_value,
                })) || [],
            };
        }

        const profileSummaryData = result['summary'];
        const summary : ProfileSummary = {
            netWorth: profileSummaryData?.net_worth || 0,
            givingScore: profileSummaryData?.giving_score || 0,
            givingCapacity: profileSummaryData?.giving_capacity || 0,
        };

        return {
            data: {
            userId: result.user_id,
            dateCreated: result.date_created,
            address: result.address,
            prospectName: result.prospect_name,
            propertyData: propertyData,
            secData: secDataComplete,
            politicalContributions: politicalContributions,
            summary: summary,
        },
            events: events,
        };
    }

    /**
     * 
     * @param profile Convert back into python API data format.
     * @returns 
     */
    static toApiData(profile: {data: ProfileData}, userId: string, prospectName: string, employer): any {
        const { data } = profile;

        if ((data as any).user_id ) {
            return data; // Already in API format
        }

        const property_data = data.propertyData?.map((p: any) => ({
            address: p.address,
            identifier: p.identifier,
            market_total_value: p.marketTotalValue,
            mailing_address: p.mailingAddress,
        })) || [];

        let sec_data: any = undefined;
        if (data.secData) {
            sec_data = {
                insider_filings: {
                    filings: data.secData.insiderFilings?.filings?.map((f: any) => ({
                        id: f.id,
                        accession_number: f.accessionNumber,
                        filed_at: f.filedAt instanceof Date ? f.filedAt.toISOString() : f.filedAt,
                        document_type: f.documentType,
                        period_of_report: f.periodOfReport,
                        not_subject_to_section_16: f.notSubjectToSection16,
                        footnotes: f.footnotes,
                        transactions: f.transactions?.map((t: any) => ({
                            security_title: t.securityTitle,
                            transaction_date: t.transactionDate instanceof Date ? t.transactionDate.toISOString() : t.transactionDate,
                            coding: {
                                form_type: t.coding.formType,
                                code: t.coding.code,
                                equity_swap_involved: t.coding.equitySwapInvolved,
                            },
                            amounts: {
                                shares: t.amounts.shares,
                                shares_footnote_id: t.amounts.sharesFootnoteId,
                                price_per_share: t.amounts.pricePerShare,
                                acquired_disposed_code: t.amounts.acquiredDisposedCode,
                            },
                            post_transaction_amounts: t.postTransactionAmounts ? {
                                shares_owned_following_transaction: t.postTransactionAmounts.sharesOwnedFollowingTransaction,
                                shares_owned_following_transaction_footnote_id: t.postTransactionAmounts.sharesOwnedFollowingTransactionFootnoteId,
                            } : undefined,
                            ownership_nature: t.ownershipNature,
                        })),
                        reporting_owner: f.reportingOwner ? {
                            name: f.reportingOwner.name,
                            cik: f.reportingOwner.cik,
                            relationship: {
                                is_officer: f.reportingOwner.relationship.isOfficer,
                                is_director: f.reportingOwner.relationship.isDirector,
                                is_ten_percent_owner: f.reportingOwner.relationship.isTenPercentOwner,
                                is_other: f.reportingOwner.relationship.isOther,
                            }
                        } : undefined,
                        issuer: f.issuer ? {
                            name: f.issuer.name,
                            cik: f.issuer.cik,
                            trading_symbol: f.issuer.tradingSymbol,
                        } : undefined,
                    })) || [],
                    total_filings: data.secData.insiderFilings?.totalFilings ?? 0,
                },
                current_holdings: data.secData.currentHoldings?.map((h: any) => ({
                    name: h.name,
                    ticker: h.ticker,
                    shares_owned: h.sharesOwned,
                    share_price: h.sharePrice,
                    total_value: h.totalValue,
                })) || [],
            };
        }

        const summary = data.summary ? {
            net_worth: data.summary.netWorth,
            giving_score: data.summary.givingScore,
            giving_capacity: data.summary.givingCapacity,
        } : undefined;

        const political_contributions = data.politicalContributions?.map((c: any) => ({
            candidate_id: c.candidateId,
            committee: {
                id: c.committee.id,
                name: c.committee.name,
                type: c.committee.type,
                state: c.committee.state,
                city: c.committee.city,
                zip: c.committee.zip,
                created_at: c.committee.createdAt,
                cycle: c.committee.cycle,
                party: c.committee.party,
            },
            candidate_name: c.candidateName,
            candidate_last_name: c.candidateLastName,
            candidate_middle_name: c.candidateMiddleName,
            contribution_receipt_amount: c.contributionReceiptAmount,
            contributor_first_name: c.contributorFirstName,
            contributor_last_name: c.contributorLastName,
            contributor_address: {
                address_one: c.contributorAddress.addressOne,
                address_two: c.contributorAddress.addressTwo,
                city: c.contributorAddress.city,
                state: c.contributorAddress.state,
                zip: c.contributorAddress.zip,
            },
            contributor_employer: c.contributorEmployer,
            contributor_occupation: c.contributorOccupation,
            contribution_receipt_date: c.contributionReceiptDate instanceof Date ? c.contributionReceiptDate.toISOString() : c.contributionReceiptDate,
        })) || [];


        const result =  {
            user_id:  userId,
            date_created: data.dateCreated,
            address: data.address,
            prospect_name: prospectName,
            prospect_employer: employer,
            property_data,
            sec_data,
            political_contributions,
            summary,
        };

        return result;
    }
}