'use server';
import {prisma} from "@/prisma/prisma";

type GetNumLikesProps = {
    postId: string,
}

export async function getNumLikes({postId}: GetNumLikesProps){
    const liked = await prisma.postLike.count({
        where: {postId: postId}
    });

    return liked;
}