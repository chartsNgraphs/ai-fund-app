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
import { useSearchParams, useRouter } from "next/navigation";
import updateTrackingAction from "../actions/update-tracking-action";
import Giving from "./components/giving";

export default function ProfileDetailView(props: { profiles: ProspectProfile[], prospectId: string, tracked: boolean }) {

	const { profiles, prospectId } = props;
	const { toast } = useToast();
	const searchParams = useSearchParams();
	const router = useRouter();
	const track = props.tracked || false;

	// sort profiles by createdAt date
	profiles.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isRefreshDialogOpen, setIsRefreshDialogOpen] = useState(false);

	// Parse profile data
	const parsedProfileDatas = profiles.map((profile: any) => {
		return ProfileAdapter.toProfileData(profile.data as unknown as string).data;
	});

	// Get the index from the query parameter or default to 0 (latest profile)
	const profileIndex = parseInt(searchParams.get("profileIndex") || "0", 10);
	const selectedProfileIndex = isNaN(profileIndex) || profileIndex < 0 || profileIndex >= profiles.length ? 0 : profileIndex;

	const currentProfileData = parsedProfileDatas[selectedProfileIndex];

	// Handle profile selection
	const handleProfileSelect = (index: number) => {
		router.push(`?profileIndex=${index}`);
	};

	const handleRefresh = async () => {
		setIsRefreshDialogOpen(false);
		setIsRefreshing(true);
		const result = await refreshProfileDataAction(prospectId);
		if (result.success) {
			setIsRefreshing(false);
			toast({
				title: "Profile data refreshed successfully",
				description: "The profile data has been refreshed successfully.",
				variant: "default",
				duration: 5000,
			});
			// reolad page
			router.refresh();
		}
		else {
			setIsRefreshing(false);
			toast({
				title: "Error refreshing profile data",
				description: "There was an error refreshing the profile data. Please try again in a few minutes.",
				variant: "destructive",
				duration: 5000,
			});
		}
	}

	const handleTrackingChange = async (checked: boolean) => {
		const result = await updateTrackingAction(prospectId, checked);
		if (result.success) {
			toast({
				title: "Tracking status updated",
				description: `You will now ${checked ? "receive" : "not receive"} updates on this profile.`,
				variant: "default",
				duration: 5000,
				});
			router.refresh(); // Refresh the page
		}
		else {
			toast({
				title: "Error updating tracking status",
				description: "There was an error updating the tracking status. Please try again.",
				variant: "destructive",
				duration: 5000,
			});
		}
		
	}

	const dates = profiles.map((profile: any) => new Date(profile.createdAt));
	const profileDates = dates.map((date) => ({ date: date.toLocaleString() }));

	return (
		<div className="container mx-auto">
			<div className="w-full mt-4 flex flex-row gap-4 flex-wrap">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="rounded-full">
							Data as of {profileDates[selectedProfileIndex]?.date || "Unknown"} <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{profileDates.map((dateObj, index) => (
							<DropdownMenuItem
								key={dateObj.date + index}
								onClick={() => handleProfileSelect(index)}
							>
								<span className="text-sm font-semibold">{dateObj.date}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="flex items-center mr-auto space-x-2">
					<Switch id="track-prospect" onCheckedChange={handleTrackingChange} defaultChecked={track}/>
					<Label htmlFor="track-prospect" >Automatically update me with changes</Label>
				</div>
				<Dialog open={isRefreshDialogOpen} onOpenChange={setIsRefreshDialogOpen}>
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
								This will take some time, and will also update your feed with the latest changes & any new insights.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" className="rounded-full" onClick={() => setIsRefreshDialogOpen(false)}>Cancel</Button>
							<Button variant="default" className="rounded-full" onClick={handleRefresh}>Yes, refresh now</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			{   currentProfileData ?
				<>
					<div className={`grid gap-8 w-full mt-4 ${currentProfileData.secData ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
						<PropertyDataDisplay data={currentProfileData.propertyData} />
						{currentProfileData.secData && <InsiderTradingDataDisplay data={currentProfileData.secData} />}
					</div>
					{(currentProfileData.politicalContributions?.length ? true : true) && <Giving politicalGifts={currentProfileData.politicalContributions ?? []} />}
				</>
				:
				<div className="flex flex-col items-center justify-center w-full mt-4">
					<p className="text-gray-500">No profile data available. Click refresh to complete the AI profile.</p>
				</div>
			}
			
		</div>
	)
}