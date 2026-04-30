'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type GetOwnsCommentProps = {
    commentId: string,
}

export async function getOwnsComment({commentId}: GetOwnsCommentProps){
    const session = await getServerSession(authOptions);
    const userId = String(session?.user.id);

    const comment = await prisma.comment.findFirst({
        where: {id: commentId, authorId: userId}
    });

    if(comment){
        return true;
    }
    else{
        return false;
    }
}