"use server";
import { authOptions } from "@/utils/auth-options";
import ProspectSearchBar from "./prospect-search-bar";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { repo } from "@/repository/prospect-repository";
import { User } from "@/model/users/user";
import ProspectResultsTable from "./prospect-results-table";
import { ProspectResultsSkeleton } from "./prospect-results-skeleton";
import React from "react";
import { getSearchHistory } from "./actions/search-history-actions";
import { addSearchToHistory } from "./actions/search-history-actions";


export default async function Prospects({ searchParams }) {
    const { query, page, limit } = await searchParams;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 25;

    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!user || !user.id) {
        notFound();
    }

    if (query) {
        console.log("Adding search to history:", query);
        await addSearchToHistory(query);
    }

    const prospectRepository = repo;

    // Get the search history for the user
    const searchHistory = await getSearchHistory(user.id);

    console.log("Search history:", searchHistory, typeof searchHistory);

    const prospectsPromise = prospectRepository.getAll(user.id, query, pageNumber, limitNumber);

    const {prospects, count} = await prospectsPromise;

    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <ProspectSearchBar history={searchHistory} />
            <React.Suspense fallback={<ProspectResultsSkeleton />}>
                <ProspectResultsTable
                    prospects={prospects} page={pageNumber} totalPages={Math.ceil(count / limitNumber)} limit={limitNumber}
                />
            </React.Suspense>
        </div>
    );
}