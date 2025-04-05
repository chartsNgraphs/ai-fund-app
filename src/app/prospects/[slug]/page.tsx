"use server";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import ProspectRepository from "@/repository/prospect-repository";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await await params;

	const session = await getServerSession(authOptions);

	const prospectRepository = new ProspectRepository();
	const prospect = await prospectRepository.getById(slug);

	if (!prospect) {
		throw new Error("Prospect not found");
	}

	if (!session) {
		throw new Error("Session not found");
	}

	if (!session || !session.user) {
		throw new Error("Session not found");
	}

	return (
		<>
			<div>Prospect id: {slug}</div>
			<p>{JSON.stringify(prospect)}</p>
		</>
	);
}
