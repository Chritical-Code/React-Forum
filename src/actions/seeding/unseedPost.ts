'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export async function unseedPost(formData: FormData){
    const session = await getServerSession(authOptions);
    const postId = String(formData.get("postId"));

    await prisma.post.delete({
        where: {id: postId}
    });

    redirect("/seed/unseed");
}