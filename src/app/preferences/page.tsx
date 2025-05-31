"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Settings, Cpu } from "lucide-react";
import GeneralSettings from "./settings-pages/general-settings";
import AISettings from "./settings-pages/ai-settings";

export default async function Preferences() {

    return (
        <div className="container mx-auto pt-4 p-2">
            <h1 className="text-2xl font-bold mb-4">Preferences</h1>
            <div className="mt-6">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="rounded-full">
                        <TabsTrigger value="general" className="rounded-full flex items-center gap-2">
                            <Settings size={16} /> General
                        </TabsTrigger>
                        <TabsTrigger value="ai-features" className="rounded-full flex items-center gap-2">
                            <Cpu size={16} /> AI Features
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="mt-4">
                        <Card className="p-4">
                            <GeneralSettings />
                        </Card>
                    </TabsContent>
                    <TabsContent value="ai-features">
                        <Card className="p-4">
                            <AISettings />
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}