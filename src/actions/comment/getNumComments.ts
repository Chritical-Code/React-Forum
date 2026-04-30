'use server';
import {prisma} from "@/prisma/prisma";

type GetNumCommentsProps = {
    postId: string,
}

export async function getNumComments({postId}: GetNumCommentsProps){
    const comments = await prisma.comment.count({
        where: {postId: postId}
    });

    return comments;
}