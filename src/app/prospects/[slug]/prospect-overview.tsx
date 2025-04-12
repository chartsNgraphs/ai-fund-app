import { Card } from "@/components/ui/card";
import { Prospect } from "@/model/prospects/prospect";
import { Pencil, Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import EditButton from "./components/edit-button";

export default function ProspectOverview(prospect: Prospect) {
    
    if (!prospect || !prospect.id) {
        return <div>No prospect data available</div>;
    }

    return (
        <Card className="w-full h-full p-4">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {`${prospect.firstName.toLocaleUpperCase()} ${prospect.lastName.toLocaleUpperCase()}`}
                </h2>
                <EditButton prospectId={prospect.id} />
            </div>
            <hr className="m-3"></hr>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-row gap-1">
                    <span className="text-sm font-medium">
                        <Mail className="h-5 w-5" />
                    </span>
                    <span className="text-sm pl-2">{prospect.email}</span>
                </div>
                <div className="flex flex-row gap-1">
                    <span className="text-sm font-lg">
                        <Phone className="h-5 w-5" />
                    </span>
                    <span className="text-sm pl-2">{prospect.phone}</span>
                </div>
            </div>
            
        </Card>
    );
}