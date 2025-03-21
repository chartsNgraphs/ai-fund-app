"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginButtons from "./login-buttons";

export default async function Header() {
  return (
    <Card className="bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-none">
      <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        <li className="text-primary font-medium">
          <Link href="/">Home</Link>
        </li>
        <li>
          <a href="/chat">Feed</a>
        </li>
        <li>
          <a href="/chat">Prospects</a>
        </li>
      </ul>

      <div className="flex items-center gap-6 width-full justify-end md:justify-between">
        {/* <ModeToggle /> */}
        <div className="hidden md:block px-2">
          <LoginButtons arrange="horizontal" />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <div className="flex md:hidden mr-2 items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem className="p-3">
                  <a href="#home">Home</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <a href="/feed">Feed</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <a href="/prospects">Prospects</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <LoginButtons arrange="vertical" />
        </div>
      </div>
    </Card>
  );
}
