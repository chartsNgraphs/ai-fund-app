"use server";
import { authOptions } from "@/utils/auth-options";
import WealthSnapshotDisplay from "./components/prospect-wealth-snapshot";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import ProspectRepository from "@/repository/prospect-repository";
import { notFound } from "next/navigation";
import ProspectOverview from "./prospect-overview";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import ProspectAddressInformation from "./components/prospect-address-information";
import ProspectSocialDisplay from "./components/prospect-social-display";
import ProfileDetailView from "./profile-detail-view";
import updateViewedAtAction from "../actions/update-viewed-at-action";
import ProfileTimeline from "./components/profile-timeline";


export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		throw new Error("Session not found");
	}

	const userId = (session?.user as unknown as any).id;

	const prospectRepository = new ProspectRepository();
	const prospect = await prospectRepository.getById(slug);
	if (!prospect) {
		notFound();
	}

	if (!prospect?.userId || (prospect?.userId !== userId)) {
		throw new Error("Unauthorized access to this prospect");
	}

	// Update the viewedAt timestamp for the prospect
	// This is a server action, so it will run on the server side
	updateViewedAtAction(slug);

	const wealthPlaceholder: WealthSnapshot = {
		estimatedNetWorth: 2800000,
		candidateQualityScore: 4,
		givingPotential: 5000,
		realEstateValue: 1200000,
		summary: "Greg is a is a great potential donor due to his high net worth and giving potential. Recent real estate transactions indicate a strong financial position, and stock market insider activity means some liquid cash! Reach out to Greg soon.",
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
						<BreadcrumbItem>{`View`}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<ProspectOverview {...prospect} />
				<ProfileTimeline prospect={prospect}/>
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
				<ProfileDetailView profiles={prospect.profiles || []} prospectId={prospect.id!} tracked={prospect.tracked}/>
			</div>
		</>
	);
}
