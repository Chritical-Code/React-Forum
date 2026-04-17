'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


export async function addComment(formData: FormData){
    const session = await getServerSession(authOptions);

    const text = String(formData.get("text") ?? "");
    if (text == ""){return;}

    const postId = String(formData.get("postId") ?? "");
    const authorId = String(session?.user.id);

    const newComment = await prisma.comment.create({
        data: {text: text, authorId: authorId, postId: postId}
    });
}