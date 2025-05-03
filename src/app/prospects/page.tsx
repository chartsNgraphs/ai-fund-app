"use server";
import { authOptions } from "@/utils/auth-options";
import ProspectSearchBar from "./prospect-search-bar";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ProspectRepository from "@/repository/prospect-repository";
import { User } from "@/model/users/user";
import ProspectResultsTable from "./prospect-results-table";
import { ProspectResultsSkeleton } from "./prospect-results-skeleton";
import React from "react";


export default async function Prospects({ searchParams }) {
    const { query, page, limit } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 25;

    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!user || !user.id) {
        notFound();
    }

    const prospectRepository = new ProspectRepository();

    const prospectsPromise = prospectRepository.getAll(user.id, query, pageNumber, limitNumber);

    const {prospects, count} = await prospectsPromise;

    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <ProspectSearchBar />
            <React.Suspense fallback={<ProspectResultsSkeleton />}>
                <ProspectResultsTable
                    prospects={prospects} page={pageNumber} totalPages={Math.ceil(count / limitNumber)} limit={limitNumber}
                />
            </React.Suspense>
        </div>
    );
}