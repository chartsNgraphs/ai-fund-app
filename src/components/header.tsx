'use server';

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
    <Card className="bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        <li className="text-primary font-medium">
          <Link href="/">Home</Link>
        </li>
        <li>
          <a href="/chat">Research</a>
        </li>
      
      </ul>

      <div className="flex items-center gap-4">
        {/* <ModeToggle /> */}
        <div className="hidden md:block px-2"><LoginButtons arrange='horizontal'/></div>
        <div className="flex md:hidden mr-2 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 rotate-0 scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="#home">Home</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/chat">Research</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LoginButtons arrange='vertical'/>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className="w-full text-sm">Get Started</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
