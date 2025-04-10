'use server';

import ProspectRepository from "@/repository/prospect-repository";

export default async function updateViewedAtAction(prospectId: string) {
    const prospectRepository = new ProspectRepository();
    const prospect = await prospectRepository.getById(prospectId);
    if (!prospect) {
        throw new Error("Prospect not found");
    }

    await prospectRepository.view(prospectId);
}