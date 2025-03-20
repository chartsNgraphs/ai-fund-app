"use client";

import Link from "next/link";
import { Button } from "./ui/button";
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
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Card } from "./ui/card";

export default function LoginButtons({
  arrange,
}: {
  arrange: "horizontal" | "vertical";
}) {
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
        arrange === "horizontal" ? "flex-row" : "flex-col"
      }`}
    >
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <h3 className="text-md bold">{session.user?.name}</h3>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-1">
            <Card className="p-4 flex flex-col gap-4">
              <Button onClick={() => signOut()} variant={"default"}>
                Logout as {session.user?.name}
              </Button>
              <Button variant={"secondary"}>
                Profile
              </Button>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button variant={"default"}>Login</Button>
        </Link>
      )}
    </div>
  );
}
