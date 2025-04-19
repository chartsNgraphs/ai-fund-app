"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Settings, Bell, Cpu } from "lucide-react";

export default async function Preferences() {

    return (
        <div className="container mx-auto pt-4">
            <h1 className="text-2xl font-bold mb-4">Preferences</h1>
            <p className="text-gray-600">Manage your preferences here.</p>
            <div className="mt-6">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="rounded-full">
                        <TabsTrigger value="general" className="rounded-full flex items-center gap-2">
                            <Settings size={16} /> General
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="rounded-full flex items-center gap-2">
                            <Bell size={16} /> Notifications
                        </TabsTrigger>
                        <TabsTrigger value="ai-features" className="rounded-full flex items-center gap-2">
                            <Cpu size={16} /> AI Features
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="mt-4">
                        <Card className="p-4">General settings content goes here.</Card>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Card className="p-4">Notification settings content goes here.</Card>
                    </TabsContent>
                    <TabsContent value="ai-features">
                        <Card className="p-4">AI Features settings content goes here.</Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}