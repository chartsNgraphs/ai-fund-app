'use client';
import { Card } from "@/components/ui/card";
import { Filing, SECData } from "@/model/profiles/sec-data";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function InsiderTradingDataDisplay(props: { data: SECData }) {
    const { data } = props;

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
function FilingData(props: {filing: Filing}) {

    const { filing } = props;

    return (
        <AccordionItem value={filing.id} className="w-full">
            <AccordionTrigger className="text-md font-medium">{`Filing on ${filing.filedAt.toLocaleDateString()}`}</AccordionTrigger>
            <AccordionContent>
                <Card  className="w-full p-4 flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-center w-full">
                        {
                            filing.entities?.map((entity, index) => (
                                <Badge variant='outline' className="badge-sm text-xs font-medium" key={index}>{entity.companyName}</Badge>
                            ))
                        }
                    </div>
                    <p>{filing.description}</p>
                    {filing.ticker && <p>{`Ticker: ${filing.ticker}`}</p>}
                    


                    <Link href={filing.linkToHtml} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full rounded-full" size="sm">
                            {`View on SEC.gov`}
                        </Button>
                    </Link>
                </Card>
            </AccordionContent>
        </AccordionItem>

    )
}