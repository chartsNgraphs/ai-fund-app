'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { PropertyData } from "@/model/profiles/property-data";
import { Badge } from "@/components/ui/badge";

export default function PropertyDataDisplay(props: { data: PropertyData[] }) {
    const { data } = props;

    const totalPropertyValue = data.reduce((acc, property) => acc + property.marketTotalValue, 0);

    return (
        <Card className="w-full h-full p-4">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">{`Property Data`}</h2>
                <div className="flex flex-row gap-4 items-center">
                    <Badge variant="secondary" className="badge-sm text-xs my-0 px-2 bg-muted cursor-auto hover:bg-muted hover:text-secondary-foreground dark:bg-muted dark:text-muted-foreground">
                        {`${data.length} Properties`}
                        </Badge>
                    <Badge variant="secondary" className="badge-sm text-xs my-0 px-2 bg-muted cursor-auto hover:bg-muted hover:text-secondary-foreground dark:bg-muted dark:text-muted-foreground">
                        {`Total Property Value: $${totalPropertyValue.toLocaleString()}`}
                        </Badge>
                </div>
                <Accordion type="single" collapsible className="w-full border-b-0">
                    <AccordionItem value="item-1" className="w-full border-b-0">
                        <AccordionTrigger className="font-medium text-md w-full">{`See ${data.length} properties`}</AccordionTrigger>
                        <AccordionContent className="text-sm p-2 w-full flex flex-col gap-4">
                            {data.map((property, index) => (
                                <Card key={index} className="flex flex-col gap-2 border-b pb-2 p-3 justify-start items-start w-full">
                                    <Badge variant="default">
                                        <span className="text-sm">{`$ ${property.marketTotalValue.toLocaleString()}`}</span>
                                    </Badge>
                                    <span className="text-sm font-medium">{`${property.address}`}</span>
                                    
                                    <span className="text-xs">{`Mailing Address: ${property.mailingAddress}`}</span>
                                </Card>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Card>
    );
}
