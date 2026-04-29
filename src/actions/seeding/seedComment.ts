'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function seedComment(formData: FormData){
    const session = await getServerSession(authOptions);
    const userId = String(formData.get("userId"));
    const postId = String(formData.get("postId"));
    const text = String(formData.get("text"));

    const newComment = await prisma.comment.create({
        data: {
            authorId: userId,
            postId: postId,
            text: text
        }
    });
}