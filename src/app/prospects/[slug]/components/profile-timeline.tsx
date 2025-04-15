import { Button } from "@/components/ui/button"
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

export default function ProfileTimeline(props: { prospect: Prospect}) {

    const { prospect } = props

    return (
        <div className="w-full mx-auto flex flex-row flex-wrap flex-start mt-4 gap-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Card className="w-full flex items-center justify-between p-4 cursor-pointer border border-primary/50 hover:border-primary/80 hover:bg-muted transition-all duration-200 ease-in-out">
                        <span className="text-sm sm:text-base font-medium">View Timeline</span>
                        <ChevronRight className="w-4 h-4" />
                    </Card>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-screen-sm">
                    <SheetHeader>
                    <SheetTitle>Prospect Timeline</SheetTitle>
                    <SheetDescription>
                        {`Reach out at the right time to ${prospect.firstName} ${prospect.lastName}`}
                    </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                   
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