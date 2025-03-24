import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from 'next/link';

export default function NotFound() {

    return (
        <div className="container mx-auto pt-4 flex justify-center">
            <Card className="m-1 p-4 flex flex-col items-center md:w-full lg:w-1/2 ">
                <h1 className="text-2xl">404 - Page Not Found</h1>
                <p className="m-3">Sorry, the page or item you are looking for does not exist.</p>
                <Link className={buttonVariants({ variant: "default", className:'rounded-full'})} href="/">
                    Go to Home
                </Link>
            </Card>
        </div>
    );
    }