import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ProspectAddressInformation(props) {

    const { addresses } = props;

    return (
        <div className="w-full">
            <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger className="font-medium text-md w-full">Address Information
                    </AccordionTrigger>
                    <AccordionContent className="text-sm p-2 w-full">
                        {addresses.map((address, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <span className="text-sm">{`${address.street} ${address.street2}`}</span>
                                <span className="text-sm">{`${address.city}, ${address.state} ${address.zip}`}</span>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}