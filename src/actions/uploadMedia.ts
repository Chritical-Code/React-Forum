'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import path from "path"; 
import sharp from "sharp";

export async function uploadMedia(formData: FormData){
    const session = await getServerSession(authOptions);

    const postId = String(formData.get("postId") ?? "");

    //file data logic
    const file = formData.get("image") as File;
    const bytes = await file.arrayBuffer(); 
    const buffer = Buffer.from(bytes);
    
    //sharp process image
    const sharpImage = sharp(buffer);
    sharpImage.resize({width: 480, height: 270, fit: "contain"});
    sharpImage.webp();

    //file write logic
    const filePath = path.join(process.cwd(), "public/uploads", "img.webp");
    await sharpImage.toFile(filePath);

    console.log("The file seems to have uploaded");
}