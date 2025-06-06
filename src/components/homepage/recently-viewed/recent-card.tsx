'use client';
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

/**
 * CLIENT COMPONENT
 * React component for displaying a recently viewed prospect in the homepage.
 * @param params: { id: string; title: string; subtitle: string; } 
 * @returns 
 */
export default function RecentCard({ id, title, subtitle }: { id: string; title: string; subtitle: string; }) {
    const router = useRouter();

    return (
        <Card className="w-full h-full bg-background hover:bg-muted hover:text-card-foreground transition-all duration-300 ease-in-out cursor-pointer min-w-[200px] max-w-[220px] overflow-hidden"
            onClick={() => {
                router.push(`/prospects/${id}`);
            }
            }>
            <div className="w-full h-4 bg-secondary" />
            <div className="p-4 pt-2 gap-2 flex flex-col justify-center items-start">
                <h2 className="text-lg font-bold">
                    {title}
                </h2>
                <p className="hidden md:flex text-sm text-muted-foreground flex-row items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {subtitle}
                </p>
            </div>
        </Card>
    );
}