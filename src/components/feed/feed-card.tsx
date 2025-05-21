import { Card } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { CircleHelp, Share, Trash } from "lucide-react";
import { Save } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FeedCard({
  id,
  badges, // Default badges
  title, // Default title
  description, // Default description
  date,
}: {
  id: string; // Unique identifier for the card
  badges?: string[]; // Optional badges
  title?: string; // Optional title
  description?: string; // Optional description
  date?: string; // Optional date
}) {
  return (
    <Card className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between items-center mb-2">
        {badges && (
          <div className="flex flex-row gap-2 h-6">
            {badges.map((badge, index) => (
              <Badge
                key={`badge-${id}-${index}`} // Unique key for each badge
                className="badge-sm py-0 text-xs my-0 px-2 bg-muted cursor-auto hover:bg-muted hover:text-secondary-foreground dark:bg-muted dark:text-muted-foreground"
                variant="secondary" // Use secondary variant for badges
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-row gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center gap-1 rounded-full"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-1">
              <DropdownMenuItem className="p-2">
                Share
                <Share className="h-4 w-4 ml-2" />
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2">
                Why am I seeing this?
                <CircleHelp className="h-4 w-4 ml-2" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-xs font-bold text-muted-foreground">{date}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-row justify-between items-center mt-2 flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 rounded-full"
        >
          Learn More
        </Button>
        <div className="flex flex-row gap-2 wrap items-end flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 rounded-full"
          >
            Mark as Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 rounded-full"
          >
            <Save className="h-4 w-4" /> Save to this prospect
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1 rounded-full"
          >
            <DollarSign className="h-4 w-4" /> Act
          </Button>
        </div>
      </div>
    </Card>
  );
}
