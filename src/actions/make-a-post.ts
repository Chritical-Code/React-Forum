'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
import { title } from "process";

export async function makePost(formData: FormData){
    const session = await getServerSession(authOptions);

    const title = String(formData.get("title") ?? "title");
    const text = String(formData.get("text") ?? "text");

    const post = await prisma.post.create({
        data: {
            title: title,
            text: text,
            author: {connect: {id: session?.user.id}}
        }
    });

    redirect("/post/view/" + post.id);
}