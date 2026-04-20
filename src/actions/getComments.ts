'use server';
import {prisma} from "@/prisma/prisma";

type GetComentsProps = {
    postId: string,
}

export async function getComments({postId}: GetComentsProps){
    const commentData = await prisma.comment.findMany({
        where: {postId: postId},
        include: {author: true},
        orderBy: {createdAt: "desc"}
    });

    return commentData;
}


export type CommentWithAuthor = Awaited<ReturnType<typeof getComments>>[number];