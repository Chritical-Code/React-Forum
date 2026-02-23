'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

export async function updatePost(formData: FormData){
    const session = await getServerSession(authOptions);

    const title = String(formData.get("title") ?? "");
    const text = String(formData.get("text") ?? "");
    const postId = String(formData.get("postId") ?? "");

    const post = await prisma.post.update({
        where: {id: postId, authorId: session?.user.id},
        
        data: {title: title, text: text}
    });

    redirect("/post/view/" + post.id);
}