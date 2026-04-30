'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { uploadMedia } from "../image/uploadMedia";
import { redirect } from 'next/navigation';

export async function seedPost(formData: FormData){
    const session = await getServerSession(authOptions);
    const userId = String(formData.get("userId"));
    const title = String(formData.get("title"));
    const text = String(formData.get("text"));

    const newPost = await prisma.post.create({
        data: {
            authorId: userId,
            title: title,
            text: text
        }
    });

    //handle media upload after
    let mediaFormData = formData;
    mediaFormData.append("postId", newPost.id);
    await uploadMedia(mediaFormData);

    redirect("/seed");
}