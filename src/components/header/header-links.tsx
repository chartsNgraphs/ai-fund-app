'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function HeaderLinks({ session }: { session: boolean;}) {

    const pathName = usePathname();

    const activeStyling = (path: string) => {
      return pathName === path ? "font-bold underline underline-offset-8 decoration-secondary" : "";
    }

    return (
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        <li className={`${activeStyling("/")}`}>
          <Link className="text-primary-foreground text-lg" href="/">Home</Link>
        </li>
        {session ? (
          <>
            <li className={`${activeStyling("/feed")}`}>
              <Link className="text-primary-foreground text-lg" href="/feed" >Feed</Link>
            </li>
            <li className={`${activeStyling("/prospects")}`}>
              <Link className="text-primary-foreground text-lg" href="/prospects" >Prospects</Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    )
}