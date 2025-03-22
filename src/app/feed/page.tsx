"use server";

import FeedCard from "@/components/feed/feed-card";
import { FilterChip } from "@/components/filter-chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default async function Feed() {

     const feedData = [
      {
        id: '1',
        badges: ["Asset Sale"],
        title: "Mark Cuban",
        date: "2025-03-12",
        description: "Mark Cuban recently sold 24k shares of his stake in the Dallas Mavericks for $1.2 million.",
      },
      {
        id: '2',
        badges: ["Employment Change", "Time Sensitive"],
        title: "Faviola Gomez",
        date: "2025-02-28",
        description: "Faviola was recently promoted to Senior Vice President of Marketing at XYZ Corp.",
      },
     ]

    return (
      <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full sm:w-3/4 md:w-2/3">
        <Tabs defaultValue="updates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="updates" className="rounded-full">Prospect Updates</TabsTrigger>
            <TabsTrigger value="actions" className="rounded-full">Tasks & Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="updates">
            <div className="flex flex-row gap-1 justify-start">
                <FilterChip className='h-7 rounded-full' label="Asset Sales" checked={false} />
                <FilterChip className='h-7 rounded-full' label="Employment Changes" checked={false}  />
                <FilterChip className='h-7 rounded-full' label="News" checked={false} />
            </div>
            <hr className="my-5" />
            <div className="mt-3 flex flex-col gap-5">
            {feedData.map((item) => (
              <FeedCard
                id={item.id}
                key={item.id}
                badges={item.badges}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            ))}
            </div>
          </TabsContent>
          <TabsContent value="actions">
          </TabsContent>
        </Tabs>
      </div>
    </div>
    );
    }