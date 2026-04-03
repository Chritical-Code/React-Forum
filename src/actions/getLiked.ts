'use server';

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type GetLikedProps = {
    postId: string,
}

export async function getLiked({postId}: GetLikedProps){
    const session = await getServerSession(authOptions);
    const userId = String(session?.user.id);

    const liked = await prisma.postLike.findFirst({
        where: {authorId: userId, postId: postId}
    });

    if(liked){
        return true;
    }
    else{
        return false;
    }
}