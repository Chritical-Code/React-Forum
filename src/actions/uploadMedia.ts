'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import path from "path"; 
import sharp from "sharp";
import fs from "fs";

export async function uploadMedia(formData: FormData){
    const session = await getServerSession(authOptions);

    const postId = String(formData.get("postId") ?? "");

    //get image buffer
    const file = formData.get("image") as File;
    const bytes = await file.arrayBuffer(); 
    const buffer = Buffer.from(bytes);
    
    //sharp process image
    const sharpImage = sharp(buffer);
    sharpImage.resize({width: 480, height: 270, fit: "contain"});
    sharpImage.webp();

    //make database object
    const newImage = await prisma.postImage.create({
        data: {
            post: {connect: {id: postId}},
            src: ""
        }
    });

    //add id to path
    const filePath = path.join(process.cwd(), ("public/uploads/" + session?.user.id), (newImage.id + ".webp"));
    prisma.postImage.update({
        where: {id: newImage.id},
        data: {src: ("/uploads/" + session?.user.id + "/" + newImage.id + ".webp")}
    });

    // Create folder if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads", session?.user.id ?? "oopsie");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    //save file
    await sharpImage.toFile(filePath);

    console.log("The file seems to have uploaded");
}