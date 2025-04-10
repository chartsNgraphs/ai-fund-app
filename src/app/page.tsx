import Image from "next/image";
import AuthenticatedHomePage from "./home/authenticated-home-page";
import Footer from "@/components/homepage/homepage-footer";

export default function Home() {
  return (
    <div className="container mx-auto grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen p-2 pb-20 gap-2 sm:pt-8 sm:p-2 font-[family-name:var(--font-geist-sans)] sm:mx-auto mx-0">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-screen overflow-x-hidden">
        <AuthenticatedHomePage />
      </main>
      <Footer />
    </div>
  );
}
