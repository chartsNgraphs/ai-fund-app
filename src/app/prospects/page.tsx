"use server";
import { authOptions } from "@/utils/auth-options";
import ProspectSearchBar from "./prospect-search-bar";
import { DataTableDemo } from "./prospect-table";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ProspectRepository from "@/repository/prospect-repository";
import { User } from "@/model/users/user";

export default async function Prospects() {

    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!user || !user.id) {
        notFound();
    }

    const prospectRepository = new ProspectRepository();
    const prospects = await prospectRepository.getAll(user.id);

    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <ProspectSearchBar />
            <DataTableDemo prospects={prospects}/>
        </div>
    );
}