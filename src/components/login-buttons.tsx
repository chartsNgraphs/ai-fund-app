'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/app/login/logout-server-action";

export default function LoginButtons(props :  { isLoggedIn: boolean }) {

    const isLoggedIn = props.isLoggedIn;
    return (
        <>
        { !isLoggedIn ?
          <Link href="/login">
            <Button variant={"default"} className="hidden md:block px-2">
              Login
            </Button>
          </Link> : 
          <Button onClick={logout} variant={"default"} className="hidden md:block px-2">
            Logout
          </Button>
      }</>
    )
}