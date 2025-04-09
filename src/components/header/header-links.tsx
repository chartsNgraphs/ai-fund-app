'use client';
import Link from "next/link";
import { Home, UsersRound, MessagesSquare } from "lucide-react";
import { usePathname } from "next/navigation";


export default function HeaderLinks({ session }: { session: boolean; }) {

  const pathName = usePathname();

  const activeStyling = (path: string) => {
    return pathName === path ? "font-bold " : ""; // underline underline-offset-8
  }

  return (
    <ul className="hidden md:flex items-center gap-4 text-card-foreground">
      <li className={`rounded-full hover:bg-background ${activeStyling("/")}`}>
        <Link className="text-primary-foreground text-md flex flex-row items-center gap-2 hover:bg-primary/90" href="/">
          <span className="flex flex-row items-center gap-2 p-1 px-2 rounded-full">
            <Home className="w-4 h-4" />
            Home
          </span>
        </Link>
      </li>
      {session ? (
        <>
          <li className={`rounded-full hover:bg-background ${activeStyling("/prospects")}`}>
            <Link className="text-primary-foreground text-md flex flex-row items-center gap-2 hover:bg-primary/90" href="/prospects">
              <span className="flex flex-row items-center gap-2 p-1 px-2 rounded-full">
                <UsersRound className="w-4 h-4" />
                Prospects
              </span>
            </Link>
          </li>
          <li className={`rounded-full hover:bg-background ${activeStyling("/feed")}`}>
            <Link className="text-primary-foreground text-md flex flex-row items-center gap-2 hover:bg-primary/90" href="/feed">
              <span className="flex flex-row items-center gap-2 p-1 px-2 rounded-full">
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