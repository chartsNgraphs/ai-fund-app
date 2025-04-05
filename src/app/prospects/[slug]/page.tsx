"use server";
import { authOptions } from "@/utils/auth-options";
import WealthSnapshotDisplay from "./prospect-wealth-snapshot";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import ProspectRepository from "@/repository/prospect-repository";
import { notFound } from "next/navigation";
import ProspectOverview from "./prospect-overview";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import ProspectAddressInformation from "./prospect-address-information";
import ProspectSocialDisplay from "./prospect-social-display";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await await params;

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

	const wealthPlaceholder: WealthSnapshot = {
		estimatedNetWorth: 2800000,
		candidateQualityScore: 4,
		givingPotential: 5000,
		realEstateValue: 1200000,
		summary: "Greg is a is a great potential donor due to his high net worth and giving potential. Recent real estate transactions indicate a strong financial position, and stock market insider activity means some liquid cach! Reach out to Greg soon.",
	};

	return (
		<>
			<div className="container mx-auto flex flex-col items-center justify-center py-2">
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
					<WealthSnapshotDisplay data={wealthPlaceholder} />
					<Card  className="w-full h-full p-4">
						<h1 className="text-xl font-semibold">Address & Socials</h1>
						<div className="flex flex-col gap-8 p-0">
							<ProspectAddressInformation addresses={prospect.addresses}/>
							<ProspectSocialDisplay socials={prospect.socials} />
						</div>
					</Card>
				</div>
			</div>

			{/* <p>{JSON.stringify(prospect)}</p> */}
		</>
	);
}
