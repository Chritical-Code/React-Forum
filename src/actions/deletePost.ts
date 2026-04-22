'use server';
 import { promises as fs } from "fs";
 import path from "path";
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from 'next/navigation';

export async function deletePost(formData: FormData){
    const session = await getServerSession(authOptions);
    const postId = String(formData.get("postId") ?? "");

    //authenticate
    const post = await prisma.post.findFirst({
        where: {id: postId, authorId: session?.user.id}
    });

    if(!post){notFound();}

    //get images
    const images = await prisma.postImage.findMany({
        where: {postId: postId}
    });

    //delete images
    images.forEach(async image => {
        //delete file
        const path2 = image?.src ?? "/dontnameanythingthis";
        const filePath = path.join(process.cwd(), "public", path2);
        await fs.unlink(filePath);
    });

    //delete post
    await prisma.post.delete({
        where: {id: postId, authorId: session?.user.id}
    });

    redirect("/user");
}