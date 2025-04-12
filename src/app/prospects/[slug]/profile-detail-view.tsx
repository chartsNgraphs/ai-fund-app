"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, RefreshCcwDotIcon, RefreshCcwIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { refreshProfileDataAction } from "../actions/refresh-profile-data-action";

export default function ProfileDetailView(props: {profiles: any, prospectId: string}) {

	const { profiles, prospectId } = props;

	const [ isRefreshing, setIsRefreshing ] = useState(false);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		const result = await refreshProfileDataAction(prospectId);
		if (result.success) {
			console.log("Profile data refreshed successfully", result.profile);
		}
		else {
			console.error("Error refreshing profile data", result.profile);
		}
		setIsRefreshing(false);
	}

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
					<Button variant="secondary" className="rounded-full" onClick={handleRefresh} disabled={isRefreshing}>
						{
							isRefreshing ? (
                                <Loader2 className="animate-spin mr-2" size={16} />
                            ) : 
							<RefreshCcwIcon className="ml-1" size={16} />
						}
						Refresh the data 
					</Button>
				</div>
        </div>
    )
}