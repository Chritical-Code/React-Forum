'use server';

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type GetImageDataProps = {
    postId: string,
}

export async function getImageData({postId}: GetImageDataProps){
    const session = await getServerSession(authOptions);

    const images = await prisma.postImage.findMany({
        where: {postId: postId}
    });

    return images;
}