'use client';
import Link from "next/link";
import { Home, UsersRound, MessagesSquare } from "lucide-react";
import { usePathname } from "next/navigation";


export default function HeaderLinks({ session }: { session: boolean; }) {

  const pathName = usePathname();

  const activeStyling = (path: string) => {
    return pathName === path ? "font-bold underline underline-offset-8 decoration-background" : "";
  }

  return (
    <ul className="hidden md:flex items-center gap-10 text-card-foreground">
      <li className={`${activeStyling("/")}`}>
        <Link className="text-primary-foreground text-md flex flex-row items-center gap-2" href="/">
          <span className="flex flex-row items-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </span>
        </Link>
      </li>
      {session ? (
        <>
          <li className={`${activeStyling("/prospects")}`}>
            <Link className="text-primary-foreground text-md flex flex-row items-center gap-2" href="/prospects">
              <span className="flex flex-row items-center gap-2">
                <UsersRound className="w-4 h-4" />
                Prospects
              </span>
            </Link>
          </li>
          <li className={`${activeStyling("/feed")}`}>
            <Link className="text-primary-foreground text-md flex flex-row items-center gap-2" href="/feed">
              <span className="flex flex-row items-center gap-2">
                <MessagesSquare className="w-4 h-4" />
                Feed
              </span>
            </Link>
          </li>
        </>
      ) : (
        <></>
      )}
    </ul>
  )
}