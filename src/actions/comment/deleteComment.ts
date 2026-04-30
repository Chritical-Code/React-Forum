'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type DeleteCommentProps = {
    commentId: string,
}

export async function deleteComment({commentId}: DeleteCommentProps){
    const session = await getServerSession(authOptions);

    await prisma.comment.delete({
        where: {id: commentId, authorId: String(session?.user.id)}
    });
}