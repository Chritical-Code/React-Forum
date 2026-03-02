'use server'

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
        await prisma.postImage.delete({
            where: {id: imageId}
        });

        console.log("Image entry " + imageId + " deleted from database.");
    }
}