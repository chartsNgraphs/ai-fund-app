'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function EditButton({ prospectId }: { prospectId: string }) {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            className="rounded-full"
            size="sm"
            onClick={() => router.push(`/prospects/edit/${prospectId}`)}
        >
            <Pencil className="h-5 w-5" />
            Edit Prospect
        </Button>
    );
};