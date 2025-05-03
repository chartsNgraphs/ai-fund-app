"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Prospect } from "@/model/prospects/prospect";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import Link from "next/link";
import { Label } from "@/components/ui/label";

const getVisiblePages = (currentPage: number, totalPages: number) => {
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
};

export default function ProspectResultsTable({
    prospects,
    page,
    totalPages,
    limit=25,
}: {
    prospects: Prospect[];
    page: number;
    totalPages: number;
    limit: number;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`?${params.toString()}`);
        }
    };

    const handleLimitChange = (newLimit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", newLimit.toString());
        params.set("page", "1"); // Reset to the first page
        router.push(`?${params.toString()}`);
    };

    const visiblePages = getVisiblePages(page, totalPages);

    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <div className="flex justify-end mb-4 items-center">
                <label htmlFor="limit" className="mr-2">
                    Items per page:
                </label>
                <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="25" />
                    </SelectTrigger>
                    <SelectContent>
                        {[25, 50, 100].map((option) => (
                            <SelectItem key={option} value={option.toString()}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prospects.map((prospect) => (
                        <TableRow key={prospect.id} className="cursor-pointer">
                            <TableCell>
                                <Link
                                    href={`/prospects/${prospect.id}`}
                                    className="text-inherit no-underline"
                                >
                                    {`${prospect.firstName} ${prospect.lastName}`}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/prospects/${prospect.id}`}
                                    className="text-inherit no-underline"
                                >
                                    {prospect.email}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => handlePageChange(page - 1)}
                        />
                    </PaginationItem>
                    {visiblePages.map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                href="#"
                                isActive={page === pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => handlePageChange(page + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}