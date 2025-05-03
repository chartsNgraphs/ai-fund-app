"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Search, Upload } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProspectSearchBar({
    history = [],
} : {
    history: string[],
}) {

    const [searchActive, setSearchActive] = useState(false);
    const recents = history;
    const router = useRouter();
    
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const [search, setSearch] = useState(query);

    const handleSearch = async (recent?) => {
        const searchTerm = recent || search;
        if (!searchTerm || searchTerm.length < 1) {
            return;
        }
        const url = new URL(window.location.href);
        url.searchParams.set("query", searchTerm);
        url.searchParams.set("page", "0");

        router.push(url.toString());
        router.refresh();

    };

    return (
        <div className={`w-full transition p-4 bg-card border rounded-xl shadow-md ${searchActive ? "z-999" : ""}`}>
            <div className="flex items-center justify-between grid lg:grid-cols-2 gap-2 md: grid-cols-1">
                <div className="flex flex-row">
                    <Input
                        type="text"
                        placeholder="Search your prospects..."
                        className="flex-grow mr-2 rounded-full border-primary"
                        onFocus={() => setSearchActive(true)}
                        onChange={(e) => setSearch(e.target.value)}
                        defaultValue={query}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <Button className="p-2 rounded-full" variant={"default"} onClick={() => handleSearch()}>
                        <Search className="w-5 h-5" />
                        Search
                    </Button>
                </div>
                <div className="flex flex-row items-center lg:justify-end gap-2 md:justify-start">
                    <Button
                        className="p-2 rounded-full"
                        variant="outline"
                    >
                        <Upload className="w-5 h-5" />
                        Import
                    </Button>
                    <Link href="/prospects/create">
                        <Button className="p-2 rounded-full" variant="secondary">
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
                                <Badge 
                                    className="mr-2 cursor-pointer" 
                                    variant="secondary"
                                    onClick={() => {
                                        handleSearch(recent);
                                    }}
                                >
                                    {recent}
                                </Badge>
                            </div>
                        ))
                    }
                </div>
            </div>
            }
            
        </div>
    );
}