'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path"; 

export async function uploadMedia(formData: FormData){
    const session = await getServerSession(authOptions);

    const postId = String(formData.get("postId") ?? "");

    //file upload logic
    const file = formData.get("image") as File;
    const bytes = await file.arrayBuffer(); 
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public/uploads", file.name);
    await writeFile(filePath, buffer);

    console.log("The file seems to have uploaded");
}