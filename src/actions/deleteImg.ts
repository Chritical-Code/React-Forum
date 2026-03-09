'use server'
import { promises as fs } from "fs";
import path from "path";
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function deleteImg(formData: FormData){
    const session = await getServerSession(authOptions);
    const imageId = String(formData.get("imageId") ?? "");

    //get user id of post for verification (probably an innefficient method)
    const image = await prisma.postImage.findFirst({
        where: {id: imageId}
    });
    const post = await prisma.post.findFirst({
        where: {id: image?.postId}
    });

    if(post?.authorId == session?.user.id){
        try{
            await prisma.postImage.delete({
                where: {id: imageId}
            });

            //delete file
            const path2 = image?.src ?? "/dontnameanythingthis";
            const filePath = path.join(process.cwd(), "public", path2);
            await fs.unlink(filePath);
            
        }
        catch{}
        
    }
}