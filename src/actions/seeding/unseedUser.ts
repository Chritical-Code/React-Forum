'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export async function unseedUser(formData: FormData){
    const session = await getServerSession(authOptions);
    const userId = String(formData.get("userId"));

    await prisma.user.delete({
        where: {id: userId}
    });

    redirect("/seed/unseed");
}