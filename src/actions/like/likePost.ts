'use server';

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function likePost(formData: FormData){
    const session = await getServerSession(authOptions);

    const userId = String(session?.user.id ?? "");
    const postId = String(formData.get("postId") ?? "");

    //first check if we already liked it
    const liked = await prisma.postLike.findFirst({
        where: {authorId: userId, postId: postId}
    });

    if(liked){
        //delete the like
        await prisma.postLike.delete({
            where: {id: liked.id}
        });
    }
    else{
        //otherwise, create a new like
        const newLike = await prisma.postLike.create({
            data: {
                authorId: userId,
                postId: postId,
            }
        });
    }

    
}