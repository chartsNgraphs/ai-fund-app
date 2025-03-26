"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Search, Upload } from "lucide-react";
import { useState } from "react";

export default function ProspectSearchBar() {

    const [searchActive, setSearchActive] = useState(false);
    const recents = ["John Doe", "John Doe NY"]

    return (
        <div className={`w-full transition p-4 bg-white border rounded-lg shadow-md ${searchActive ? "z-999" : ""}`}
            onBlur={() => setSearchActive(false)}>
            <div className="flex items-center justify-between grid lg:grid-cols-2 gap-2 md: grid-cols-1">
                <div className="flex flex-row">
                    <Input
                        type="text"
                        placeholder="Search your prospects..."
                        className="flex-grow mr-2 rounded-full border-primary"
                        onFocus={() => setSearchActive(true)}
                    />
                    <Button className="p-2 rounded-full" variant={"default"}>
                        <Search className="w-5 h-5" />
                        Search
                    </Button>
                </div>
                <div className="flex flex-row items-center lg:justify-end gap-2 md:justify-start">
                    <Button
                        className="p-2 rounded-full"
                        variant="secondary"
                    >
                        <Upload className="w-5 h-5" />
                        Import
                    </Button>
                    <Link href="/prospects/create">
                        <Button className="p-2 rounded-full" variant="default">
                            <Plus className="w-5 h-5" />
                            <span className="hidden md:inline">Add a Prospect</span>
                            <span className="inline md:hidden">Add</span>
                        </Button>
                    </Link>
                </div>
            </div>
            {    /* Recent searches section */}
            {
                recents && 
                <div className={`fw-full ${searchActive ? "block" : "hidden"} p-1 mt-2`}>
                    <h1 className="text-md">Recent Searches</h1>
                    <div className="flex flex-row">
                    {
                        recents.map((recent, index) => (
                            <div key={`${recent}-${index}`} className="py-2 flex">
                            <Badge className="mr-2 cursor-pointer" variant="secondary">
                                John Doe
                            </Badge>
                        </div>))
                    }
                </div>
            </div>
            }
            
        </div>
    );
}


// const fakeProspects = [
//     {
//         id: '1',
//         name: "John Doe",
//         location: "New York, NY",
//         company: "Acme Corp",
//         givingAbility: "High",
//     },
//     {
//         id: '2',
//         name: "Jane Smith",
//         location: "Los Angeles, CA",
//         company: "Tech Innovations",
//         givingAbility: "Medium",
//     },
//     {
//         id: '3',
//         name: "Michael Johnson",
//         location: "Chicago, IL",
//         company: "Finance Group",
//         givingAbility: "Low",
//     },
// ]
