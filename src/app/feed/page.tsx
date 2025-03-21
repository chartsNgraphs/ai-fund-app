import { FilterChip } from "@/components/filter-chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default async function Feed() {


    return (
        <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full sm:w-1/2">
        <Tabs defaultValue="updates">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="actions">Tasks & Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="updates">
            <div className="flex flex-row gap-1 justify-start">
                <FilterChip label="Asset Sales" checked={false} />
                <FilterChip label="Employment Changes" checked={true}  />
                <FilterChip label="News" checked={false} />
            </div>
          </TabsContent>
          <TabsContent value="actions">
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
    );
    }