"use server";

import { Card } from "../../ui/card";
import ProspectRepository from "@/repository/prospect-repository";
import RecentCard from "./recent-card";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";


export default async function RecentlyViewed() {

    const session = await getServerSession(authOptions);

    const prospectRepo = new ProspectRepository();
    const prospects = await prospectRepo.getRecentlyViewed((session?.user as unknown as any).id, 5);


    if (!prospects) {
        return (
            <Card className="w-full h-full bg-background border-2 border-muted hover:bg-muted hover:text-card-foreground transition-all duration-300 ease-in-out">
                <div className="p-4">
                    <h2 className="text-lg font-bold">No recently viewed prospects</h2>
                </div>
            </Card>
        )
    }

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden">
            <h2 className="text-lg">Pick up where you left off</h2>
            <div className="scrollbar-none flex gap-4 overflow-x-auto flex-nowrap md:scrollbar-thin md:scrollbar-thumb-rounded md:scrollbar-thumb-muted md:scrollbar-track-tranparent pb-2">
                {prospects.map((prospect) => (
                    <RecentCard key={prospect.id} id={prospect.id!} title={`${prospect.firstName} ${prospect.lastName}`} subtitle={'Filler text, for now.'} />
                ))}
            </div>
        </div>
    )

}