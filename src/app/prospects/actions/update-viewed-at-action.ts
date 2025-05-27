'use server';

import { repo } from "@/repository/prospect-repository";

export default async function updateViewedAtAction(prospectId: string) {
    const prospectRepository = repo;
    const prospect = await prospectRepository.getById(prospectId);
    if (!prospect) {
        throw new Error("Prospect not found");
    }

    await prospectRepository.view(prospectId);
}