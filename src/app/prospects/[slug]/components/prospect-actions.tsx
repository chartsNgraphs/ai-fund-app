"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function ProspectActions(
    props: {
        prospectId: string,
        action: any
    }
) {

    const router = useRouter();
    const {toast} = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const onDelete = async () => {
        // Call the delete action
        const result = await props.action(props.prospectId);
        if (result.success) {
            router.push("/prospects");
            toast({
                title: "Prospect deleted",
                description: "The prospect has been successfully deleted.",
                variant: "default",
            });
        } else {
            toast({
                title: "Error deleting prospect",
                description: "There was an error deleting the prospect. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex flex-row gap-2 justify-end p-4 w-full rounded-xl bg-background shadow-md mt-4 border border-muted">
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="rounded-full">
                        Delete this Prospect
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this prospect? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" className="rounded-full" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" className="rounded-full" onClick={() => { setIsDeleteDialogOpen(false); onDelete(); }}>Yes, delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )

}