'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function uploadMedia(formData: FormData){
    const session = await getServerSession(authOptions);

    const postId = String(formData.get("postId") ?? "");
}