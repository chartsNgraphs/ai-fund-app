'use client';
import { Card } from "@/components/ui/card";
import { SECFiling, SECData } from "@/model/profiles/sec-data";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function InsiderTradingDataDisplay(props: { data: SECData }) {
    const { data } = props;

    const emptyData = ()=> {
        return (
            <Card className="w-full h-full p-4">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">{`Insider Trading Data`}</h2>
                    <p>{`No insider trading data available.`}</p>
                </div>
            </Card>
        );
    }

    if (data.version !== '2' || !data.insiderFilings?.filings) {
        return emptyData();
    }

    const filings = data.insiderFilings.filings;
    

    const countFilings = filings.length;

    return (
        <Card className="w-full h-full p-4">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">{`Insider Trading Data`}</h2>
                <div>
                    <Badge variant="secondary" className="badge-sm text-xs my-0 px-2 bg-muted cursor-auto hover:bg-muted hover:text-secondary-foreground dark:bg-muted dark:text-muted-foreground">{`${countFilings} recent insider filings`}</Badge>
                </div>
                <div className="flex flex-col gap-1 pb-2">
                    <Accordion type="single" collapsible className="w-full border-b-0">
                        <AccordionItem value="outer-accordion" className="w-full border-b-0">
                            <AccordionTrigger className="text-md font-medium">{`View Filings`}</AccordionTrigger>
                            <AccordionContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {
                                        filings.map((filing, index) => (
                                            <div key={index} className="flex flex-col gap-1pb-2">
                                                <FilingData filing={filing} />

                                            </div>
                                        ))
                                    }
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </Card>
    );
}

/**
 * Display a Filing
 * @param props - props.filing: Filing object containing details about the filing.
 */
function FilingData(props: {filing: SECFiling}) {

    const { filing } = props;

    return (
        <AccordionItem value={filing.id} className="w-full">
            <AccordionTrigger className="text-md font-medium">{`Filing on ${filing.filedAt.toLocaleDateString()}`}</AccordionTrigger>
            <AccordionContent>
                <Card  className="w-full p-4 flex flex-col gap-4">
                    <p>{`Filing with ${filing.transactions?.length} transactions.`}</p>
                    <div className="flex flex-row gap-4 items-center w-full">
                        <Badge variant='default' className="badge-sm text-xs font-medium" >{'$' + filing.issuer?.tradingSymbol}</Badge>
                        <Badge variant='default' className="badge-sm text-xs font-medium" >{`Document type ${filing.documentType}`}</Badge>
                    </div>
                    {
                        filing.transactions?.map((transaction, index) => (
                            <div key={index} className="flex flex-col gap-1 text-xs rounded-md border p-2">
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <Badge variant='outline' className="badge-sm text-xs font-medium" >{filing.reportingOwner.name}</Badge>
                                </div>
                                <p>{`Transaction Type: ${transaction.coding.code}`}</p>
                                <p>{`Transaction Date: ${transaction.transactionDate.toLocaleDateString()}`}</p>
                                <p>{`Security Title: ${transaction.securityTitle}`}</p>
                                <p>{`Shares: ${transaction.amounts.shares}`}</p>
                                <p>{`Price per Share: ${transaction.amounts.pricePerShare}`}</p>
                                <p>{`Form Type: ${transaction.coding.formType}`}</p>
                            </div>
                        ))
                    }
                    {
                        filing.footnotes && Object.keys(filing.footnotes).length > 0 && (
                            <div className="flex flex-col gap-1 text-xs p-4">
                                <h3 className="text-sm font-medium">Footnotes</h3>
                                <ul className="list-disc list-outside">
                                {
                                    Object.entries(filing.footnotes).map(([key, value]) => (
                                        <li key={key}>{`${value['text']}`}</li>
                                    ))
                                }
                                </ul>
                            </div>
                        )

                    }
                </Card>
            </AccordionContent>
        </AccordionItem>

    )
}