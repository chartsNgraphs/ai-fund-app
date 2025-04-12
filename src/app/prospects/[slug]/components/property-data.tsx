'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { PropertyData } from "@/model/profiles/property-data";

export default function PropertyDataDisplay(props: { data: PropertyData[] }) {
    const { data } = props;

    return (
        <Card className="w-full h-full p-4">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">{`Property Data`}</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="w-full">
                        <AccordionTrigger className="font-medium text-md w-full">{`See ${data.length} properties`}</AccordionTrigger>
                        <AccordionContent className="text-sm p-2 w-full flex flex-col gap-4">
                            {data.map((property, index) => (
                                <div key={index} className="flex flex-col gap-1 border-b pb-2">
                                    <span className="text-sm">{`Address: ${property.address}`}</span>
                                    <span className="text-sm">{`Market Total Value: $${property.marketTotalValue.toLocaleString()}`}</span>
                                    <span className="text-sm">{`Mailing Address: ${property.mailingAddress}`}</span>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Card>
    );
}
