"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  signOut,
  getProviders,
  useSession,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Settings, LogOut, LogIn, User } from "lucide-react";

import Image from "next/image";

import { Card } from "../ui/card";

export default function LoginButtons() {
  const { data: session } = useSession();
  const [, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const providers = await getProviders();

      setProviders(providers);
    };

    setAuthProviders();
  }, []);

  return (
    <div
      className={`flex items-center gap-4 ${
        'flex-row justify-end w-full'
      }`}
    >
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <div className="flex items-center gap-2 p-2 m-0 rounded-full hover:bg-secondary transition duration-200">
              <h3 className="text-md bold">{session.user?.name}</h3>
              <Image
                src={session.user?.image || ""}
                alt="Profile Picture"
                placeholder="empty"
                width={30}
                height={30}
                className="w-10 h-10 rounded-full"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-1">
            <Card className="p-4 flex flex-col gap-4">
              <Button className="rounded-full" variant={"default"}>
                <User className="mr-2" />
                Profile
              </Button>
              <Button className="rounded-full" variant={"secondary"}>
                <Settings className="mr-2" />
                Preferences
              </Button>
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
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button className="rounded-full" variant={"default"}>
            <LogIn className="mr-2" />
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
