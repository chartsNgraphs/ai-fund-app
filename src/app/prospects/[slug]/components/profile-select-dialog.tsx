import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProspectProfile } from "@/model/prospects/prospect-profile";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProfileselectDialog(props: { profiles: ProspectProfile[],
        selectedProfileIndex: number,
        onSelect: (index: number) => void,
        onClose: () => void,
        isOpen: boolean })
    {
    const { profiles, selectedProfileIndex, onSelect, onClose, isOpen } = props;
    const [selectedIndex, setSelectedIndex] = useState(selectedProfileIndex);
    const [currentPage, setCurrentPage] = useState(1);

    const profilesPerPage = 10;
    const totalPages = Math.ceil(profiles.length / profilesPerPage);
    const startIndex = (currentPage - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
    const currentProfiles = profiles.slice(startIndex, endIndex);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        onSelect(index);
        onClose();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Select Profile</DialogTitle>
                    <DialogDescription>
                        View the prospect's data at a given point in time.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    {currentProfiles.map((profile, index) => (
                        <Button key={index + startIndex} variant={selectedIndex === index + startIndex ? "default" : "outline"} onClick={() => handleSelect(index + startIndex)} className="w-full">
                            {profile.createdAt?.toLocaleString() || "Unknown"}
                        </Button>
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </DialogContent>
        </Dialog>
    );
}