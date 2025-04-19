"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Prospect } from "@/model/prospects/prospect"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Badge } from "@/components/ui/badge";

export default function ProfileTimeline(props: { prospect: Prospect}) {

    const { prospect } = props;

    const events = (prospect.events || []).slice().reverse()

    return (
        <div className="w-full mx-auto flex flex-row flex-wrap flex-start mt-4 gap-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Card className="w-full flex items-center justify-between p-4 cursor-pointer border border-primary/50 hover:border-primary/80 hover:bg-muted transition-all duration-200 ease-in-out">
                        <span className="text-sm sm:text-base font-medium">View Timeline</span>
                        <ChevronRight className="w-4 h-4" />
                    </Card>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-screen-sm overflow-y-auto">
                    <SheetHeader>
                    <SheetTitle>Prospect Timeline</SheetTitle>
                    <SheetDescription>
                        {`Reach out at the right time to ${prospect.firstName} ${prospect.lastName}`}
                    </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4 ">
                        {events.map((event, index) => (
                            <Card key={index} className="p-4 border border-primary/50 hover:border-primary/80 transition-all duration-200 ease-in-out">
                                <div className="text-sm sm:text-base font-medium">{event.summary}</div>
                                <div className="text-sm sm:text-base">{event.eventDate?.toLocaleDateString()}</div>
                                <div className="text-xs sm:text-sm">
                                    <ReactMarkdown>{event.eventRaw}</ReactMarkdown>
                                </div>
                                <div className="flex flex-row gap-2 items-center mb-0 mt-2">
                                    {event.tags?.map((badge, index) => (
                                        <Badge key={index} variant={"default"} className="badge-sm text-xs">{badge}</Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                    <SheetFooter>
                    {/* <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose> */}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}