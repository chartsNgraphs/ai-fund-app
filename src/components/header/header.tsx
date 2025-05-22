"use server";

import {
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderLinks from "./header-links";
import { Home, Menu, MessagesSquare, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginButtons from "./login-buttons";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "../dark-mode-toggle";

export default async function Header() {
  const session = await getServerSession(authOptions); // Do not use `checkAuth` here, as it will redirect to the login page if the user is not authenticated.

  return (
    <Card className="bg-card py-3 px-4 border-0 flex bg-primary items-center justify-between gap-6 rounded-none">
      <HeaderLinks session={!!session} />
      <div className="flex items-center gap-6 justify-end w-full md:justify-between w-full">
        <div className="md:hidden flex justify-between w-full">
          <div className="flex md:hidden mr-2 items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon" className="rounded-full shadow-none text-md">
                  <Menu className="h-12 w-12 rotate-0 scale-120" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetTitle className="text-center text-2xl font-bold p-2">
                  ProspectLive
                </SheetTitle>
                <div className="flex flex-col gap-2 pt-4 mb-4">
                  <a href="/" className="p-3 hover:bg-muted items-center flex">
                  <Home className="h-4 w-4 inline-block mr-2" />
                    Home
                  </a>
                  {session ? (
                    <>
                      <a href="/feed" className="p-3 hover:bg-muted items-center flex">
                      <MessagesSquare className="h-4 w-4 inline-block mr-2" />
                      Feed</a>
                      <a href="/prospects" className="p-3 hover:bg-muted items-center flex">
                      <UsersRound className="h-4 w-4 inline-block mr-2" />
                      Prospects</a>
                    </>
                  ) : null}
                </div>
                <hr></hr>
                <div className="flex flex-row justify-center w-full items-center gap-2 p-4 m-4">
                  <ModeToggle />
                  <p className="text-sm">Toggle Dark Mode</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <LoginButtons/>
      </div>
    </Card>
  );
}
