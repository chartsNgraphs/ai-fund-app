

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
            
          </TabsContent>
          <TabsContent value="actions">
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
    );
    }