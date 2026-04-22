'use server';
import {prisma} from "@/prisma/prisma";

type GetImageDataProps = {
    postId: string,
}

export async function getImageData({postId}: GetImageDataProps){
    const images = await prisma.postImage.findMany({
        where: {postId: postId}
    });

    return images;
}