'use server';

import Image from "next/image";
import AuthenticatedHomePage from "./home/authenticated-home-page";
import Footer from "@/components/homepage/homepage-footer";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";

export default async function Home() {

  // Do not use `checkAuth` here, as it will redirect to the login page if the user is not authenticated.
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen p-2 pb-20 gap-2 sm:pt-8 sm:p-2 font-[family-name:var(--font-geist-sans)] sm:mx-auto mx-0">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-screen overflow-x-hidden">
        {
          session && <AuthenticatedHomePage />
        }
      </main>
      <Footer />
    </div>
  );
}
