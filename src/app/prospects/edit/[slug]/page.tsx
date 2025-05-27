'use server';
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { repo } from "@/repository/prospect-repository";
import { notFound } from "next/navigation";
import { Prospect } from "@/model/prospects/prospect";
import CreateProspectPage from "../../create/page";

export default async function EditProspectPage({
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

	const prospectRepository = repo;
	const prospect = await prospectRepository.getById(slug);
	if (!prospect) {
		notFound();
	}

    if (!prospect?.userId || (prospect?.userId !== userId)) {
        notFound();
    }

    return (
        <CreateProspectPage
            prospect={prospect}
            mode={'edit'}
        />
    )
}