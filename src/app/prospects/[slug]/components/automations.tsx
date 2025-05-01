'use server';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Plus, Mail, Trash, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

export default async function Automations() {

    // Placeholder Automations
    const automations = [
        { name: "Send me a period summary", description: "Send an email to the prospect", properties: [
            {
                'text': 'Alert on profile changes',
                'icon': <Bell className="text-black" size={16} />,
            }
        ] },
        { name: "Remind me to reach out.", description: "Schedule a call with the prospect", properties: [
            {
                'text': 'Via email',
                'icon': <Mail className="text-black" size={16} />,
            }
        ] },
    ];

    const automationCard = (automation: { name: string; description: string; properties: {text: string, icon: any}[] }) => {
        return (
            <div key={automation.name} className="h-full flex flex-col gap-2 p-4 cursor-auto border-2 border-secondary transition-all duration-200 ease-in-out rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-medium">{automation.name}</span>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-2">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="p-1">
                        <DropdownMenuItem className="p-2">
                            Delete
                            <Trash className="h-4 w-4 ml-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2">
                            Edit
                            <Pencil className="h-4 w-4 ml-2" />
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                </div>
                <div className="flex flex-wrap gap-1">
                    {automation.properties.map((property, index) => (
                        <Badge key={index} variant={"outline"} className="badge cursor-auto flex gap-1">
                            {property.icon}
                            {property.text}
                        </Badge>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Card className="w-full flex flex-col items-left justify-between p-4 mt-4">
            <div className="flex items-center justify-between w-full">
                <span className="text-sm sm:text-base font-medium">
                    Automations
                </span>
                <Button variant={"outline"} className="badge-sm text-xs mt-2 rounded-full"> 
                    Create Automation <Plus size={16} />
                </Button>
            </div>
            <div className="flex flex-row gap-2 items-center mb-0 mt-2 flex-wrap">
                {/* <Button variant={"default"} className="badge-sm text-xs">Create Automation</Button> */}
                {automations.map((automation, index) => (
                    automationCard(automation)
                ))}
            </div>

        </Card>
    );
}