"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  signOut,
  useSession,
} from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { Settings, LogOut, LogIn, User } from "lucide-react";

import Image from "next/image";

import { Card } from "../ui/card";
import { ModeToggle } from "../dark-mode-toggle";

export default function LoginButtons() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-4 ${
        'flex-row justify-end w-full'
      }`}
    >
      {session ? (
        <>
        <div className="hidden md:flex">
        <ModeToggle/>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <div className="flex items-center gap-2 bg-white p-1 md:p-1.5 md:pl-2 m-0 rounded-full md:bg-white hover:bg-secondary transition duration-200 dark:text-primary-foreground dark:hover:text-secondary-foreground">
              <h3 className="text-md bold hidden md:block">{session.user?.name}</h3>
              <Image
                src={session.user?.image || ""}
                alt="Profile Picture"
                placeholder="empty"
                width={25}
                height={25}
                className="rounded-full w-10 h-10 md:w-8 md:h-8"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-1">
            <Card className="p-4 flex flex-col gap-4">
              <DropdownMenuItem>
                <Button className="rounded-full w-full" variant={"default"}>
                  <User className="mr-2" />
                  Profile
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Button className="rounded-full w-full" variant={"secondary"} onClick={() => router.push("/preferences")}>
                    <Settings className="mr-2" />
                      Preferences
                  </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="rounded-full"
                  onClick={() => 
                    signOut({ callbackUrl: `${window.location.origin}/` })
                  }
                  variant={"outline"}
                >
                  <LogOut className="mr-2" />
                  Logout as {session.user?.name}
                </Button>
              </DropdownMenuItem>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
      ) : (
        <>
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
        <Link href="/login">
          <Button size={'lg'} className="rounded-full" variant={"secondary"}>
            <LogIn className="mr-2" />
            Login
          </Button>
        </Link>
        </>
      )}
    </div>
  );
}
