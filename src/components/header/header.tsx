"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderLinks from "./header-links";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginButtons from "./login-buttons";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <Card className="bg-card py-3 px-4 border-0 flex bg-primary items-center justify-between gap-6 rounded-none">
      <HeaderLinks session={!!session} />

      <div className="flex items-center gap-6 justify-end w-full md:justify-between w-full">
        <div className="md:hidden flex justify-between w-full">
          <div className="flex md:hidden mr-2 items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon">
                  <Menu className="h-10 w-10 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem className="p-3">
                  <a href="#home">Home</a>
                </DropdownMenuItem>
                {session ? (
                  <>
                    <DropdownMenuItem className="p-3">
                      <a href="/feed">Feed</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3">
                      <a href="/prospects">Prospects</a>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <></>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
        </div>
        <LoginButtons/>
      </div>
    </Card>
  );
}
