'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function HeaderLinks({ session }: { session: boolean;}) {

    const pathName = usePathname();

    const activeStyling = (path: string) => {
        return pathName === path ? "text-primary text-md font-bold" : "";
    }

    return (
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        <li className={`${activeStyling("/")}`}>
          <Link href="/">Home</Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/feed" className={`${activeStyling("/feed")}`}>Feed</Link>
            </li>
            <li>
              <Link href="/prospects" className={`${activeStyling("/prospects")}`}>Prospects</Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    )
}