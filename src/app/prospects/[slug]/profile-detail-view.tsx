"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCcwIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { refreshProfileDataAction } from "../actions/refresh-profile-data-action";
import { PropertyData } from "@/model/profiles/property-data";
import PropertyDataDisplay from "./components/property-data";
import { ProspectProfile } from "@/model/prospects/prospect-profile";
import { object } from "zod";

export default function ProfileDetailView(props: { profiles: ProspectProfile[], prospectId: string }) {

	const { profiles, prospectId } = props;

	// sort profiles by createdAt date
	profiles.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	const [isRefreshing, setIsRefreshing] = useState(false);

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

	const dates = profiles.map((profile: any) => new Date(profile.createdAt));

	const profileDates = dates.map((date) => ({ date: date.toLocaleString() }));

	const selectedDate = profileDates[0].date;

	const parsed_profile_datas  = profiles.map((profile: any) => {
		let result =  JSON.parse(profile.data);
		while (typeof result === 'string') {
			result = JSON.parse(result);
		}
		return result;
	});

	console.log("Parsed profile data: ", parsed_profile_datas[0]);

	

	console.log("Property data: ", parsed_profile_datas[0].property_data);

	const propertyData: PropertyData[] = parsed_profile_datas[0]['property_data'].map((data: any) => ({
		address: data.address,
		identifier: data.identifier,
		marketTotalValue: data.market_total_value,
		mailingAddress: data.mailing_address,
	}));



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
						{profileDates.map((dateObj, index) => (
							<DropdownMenuItem
								key={dateObj.date + index}
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
			<div className="grid grid-cols-1 gap-8 w-full mt-4">
				<PropertyDataDisplay data={propertyData} />
			</div>
		</div>
	)
}