"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCcwIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { refreshProfileDataAction } from "../actions/refresh-profile-data-action";
import PropertyDataDisplay from "./components/property-data";
import { ProspectProfile } from "@/model/prospects/prospect-profile";
import InsiderTradingDataDisplay from "./components/insider-trading-data";
import { ProfileAdapter } from "@/app/services/adapters/profile-adapter";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";


export default function ProfileDetailView(props: { profiles: ProspectProfile[], prospectId: string }) {

	const { profiles, prospectId } = props;
	const { toast } = useToast();

	// sort profiles by createdAt date
	profiles.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleRefresh = async () => {
		setIsDialogOpen(false);
		setIsRefreshing(true);
		const result = await refreshProfileDataAction(prospectId);
		if (result.success) {
			console.log("Profile data refreshed successfully", result.profile);
			setIsRefreshing(false);
			toast({
				title: "Profile data refreshed successfully",
				description: "The profile data has been refreshed successfully.",
				variant: "default",
			});
		}
		else {
			setIsRefreshing(false);
			toast({
				title: "Error refreshing profile data",
				description: "There was an error refreshing the profile data. Please try again in a few minutes.",
				variant: "destructive",
			});
		}
	}

	const dates = profiles.map((profile: any) => new Date(profile.createdAt));
	const profileDates = dates.map((date) => ({ date: date.toLocaleString() }));
	const selectedDate = profileDates[0]?.date || "";
	const parsed_profile_datas  = profiles.map((profile: any) => {
		return ProfileAdapter.toProfileData(profile.data as unknown as string);
	});

	const currentProfileData = parsed_profile_datas?.[0];

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
					<Label htmlFor="track-prospect">Automatically update me with changes</Label>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="secondary" className="rounded-full" disabled={isRefreshing}>
							{
								isRefreshing ? (
									<Loader2 className="animate-spin mr-2" size={16} />
								) :
									<RefreshCcwIcon className="ml-1" size={16} />
							}
							Refresh the data
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirm Profile Refresh</DialogTitle>
							<DialogDescription>
								Are you sure you want to refresh the profile data? Select confirm to proceed.
								<br />
								This will take some time, and will also udpate your feed with the latest changes & any new insights.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" className="rounded-full" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
							<Button variant="default" className="rounded-full" onClick={handleRefresh}>Yes, refresh now</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			{   currentProfileData ?
				<div className={`grid gap-8 w-full mt-4 ${currentProfileData.secData ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
					<PropertyDataDisplay data={currentProfileData.propertyData} />
					{currentProfileData.secData && <InsiderTradingDataDisplay data={currentProfileData.secData} />}
				</div>
				:
				<div className="flex flex-col items-center justify-center w-full mt-4">
					<p className="text-gray-500">No profile data available. Click refresh to complete the AI profile.</p>
				</div>
			}
			
		</div>
	)
}