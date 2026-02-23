'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

export async function deletePost(formData: FormData){
    const session = await getServerSession(authOptions);
    const postId = String(formData.get("postId") ?? "");

    const post = await prisma.post.delete({
        where: {id: postId, authorId: session?.user.id}
    });

    redirect("/user");
}