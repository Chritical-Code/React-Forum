'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export async function unseedComment(formData: FormData){
    const session = await getServerSession(authOptions);
    const commentId = String(formData.get("commentId"));

    await prisma.comment.delete({
        where: {id: commentId}
    });

    redirect("/seed/unseed");
}