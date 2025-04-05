"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, RefreshCcwDotIcon, RefreshCcwIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ProfileDetailView(props: {profiles: any}) {

    const datesPlaceholder = [
		{ date: "2023-10-01" },
		{ date: "2023-09-01" },
		{ date: "2023-08-01" },
		{ date: "2023-07-01" },
	];

	const selectedDate = datesPlaceholder[0].date;

    return (
        <div className="container mx-auto">
            <div className="w-full mt-4 flex flex-row gap-4 flex-wrap">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="rounded-full">
								Data as of {selectedDate} <ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{datesPlaceholder.map((dateObj) => (
								<DropdownMenuItem
									key={dateObj.date}
								>
									<span className="text-sm font-semibold">{dateObj.date}</span>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="flex items-center mr-auto space-x-2">
						<Switch id="track-prospect" />
						<Label htmlFor="track-prospect">Track this Prospect</Label>
					</div>
					<Button variant="secondary" className="rounded-full">
						Refresh the data <RefreshCcwIcon className="ml-1" size={16} />
					</Button>
				</div>
        </div>
    )
}