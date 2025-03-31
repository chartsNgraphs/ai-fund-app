'use server';
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {

    const { slug } = await (await params);

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Session not found");
    }
    

    return (

      <div>Prospect id: {slug}</div>
      
    )
  }