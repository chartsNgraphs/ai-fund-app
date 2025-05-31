"use server";

import WealthSnapshotDisplay from "../../../components/prospect/prospect-wealth-snapshot";
import { Card } from "@/components/ui/card";
import {repo} from "@/repository/prospect-repository";
import { notFound } from "next/navigation";
import ProspectOverview from "./prospect-overview";
import { Breadcrumb,  BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import ProspectAddressInformation from "../../../components/prospect/prospect-address-information";
import ProspectSocialDisplay from "../../../components/prospect/prospect-social-display";
import ProfileDetailView from "./profile-detail-view";
import updateViewedAtAction from "../actions/update-viewed-at-action";
import ProfileTimeline from "../../../components/prospect/profile-timeline";
import { ProfileAdapter } from "@/app/services/adapters/profile-adapter";
import ProspectActions from "../../../components/prospect/prospect-actions";
import Automations from "../../../components/prospect/automations";
import deleteProspectAction from "../actions/delete-prospect-action";
import { checkAuth } from "@/utils/check-auth";


export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const session = await checkAuth();
	const userId = (session?.user as unknown as any).id;
	const prospectRepository = repo;
	const prospect = await prospectRepository.getById(slug);
	if (!prospect) {
		notFound();
	}

	if (!prospect?.userId || (prospect?.userId !== userId)) {
		notFound();
	}

	// Update the viewedAt timestamp for the prospect
	// This is a server action, so it will run on the server side
	updateViewedAtAction(slug);

	let profiles = prospect.profiles || [];
	profiles.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	const prifileDatas = profiles.map((profile: any) => {
		return ProfileAdapter.toProfileData(profile.data as unknown as string).data;
	});

	const currentProfileSummary = prifileDatas.length > 0 ? prifileDatas[0].summary : null;
	const lastFiveNetWorth = prifileDatas.slice(0, 5).map((data: any) => data.summary.netWorth);

	const wealthPlaceholder: WealthSnapshot = {
		estimatedNetWorth: currentProfileSummary?.netWorth || 0,
		prospectGivingScore: currentProfileSummary?.givingScore || "99",
		givingPotential: currentProfileSummary?.givingCapacity || 0,
		summary: "Greg is a is a great potential donor due to his high net worth and giving potential. Recent real estate transactions indicate a strong financial position, and stock market insider activity means some liquid cash! Reach out to Greg soon.",
		netWorthHistory: lastFiveNetWorth.length > 0 ? lastFiveNetWorth : [0, 0, 0, 0, 0],
	};

	

	return (
		<>
			<div className="container mx-auto flex flex-col items-center justify-center py-2 my-2 px-2 sm:px-0">
				<Breadcrumb className="w-full m-1 mb-2" aria-label="Breadcrumb">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/prospects">Prospects</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>{`${prospect.firstName} ${prospect.lastName}`}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<ProspectOverview {...prospect} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-4">
					<div className="lg:col-span-2">
						<WealthSnapshotDisplay data={wealthPlaceholder} />
					</div>
					<Card className="w-full h-full p-4">
						<h1 className="text-xl font-semibold">Address & Socials</h1>
						<div className="flex flex-col gap-8 p-0">
							<ProspectAddressInformation addresses={prospect.addresses} />
							<ProspectSocialDisplay socials={prospect.socials} />
						</div>
					</Card>
				</div>
				<ProfileTimeline prospect={prospect}/>
				<Automations />
				<ProfileDetailView profiles={prospect.profiles || []} data={prifileDatas} prospectId={prospect.id!} tracked={prospect.tracked}/>
				<ProspectActions prospectId={prospect.id!} action={deleteProspectAction}/>
			</div>
		</>
	);
}
