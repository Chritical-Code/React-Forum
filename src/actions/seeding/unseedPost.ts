'use server';
import { promises as fs } from "fs";
import path from "path";
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export async function unseedPost(formData: FormData){
    const session = await getServerSession(authOptions);
    const postId = String(formData.get("postId"));

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

    await prisma.post.delete({
        where: {id: postId}
    });

    redirect("/seed/unseed");
}