'use server';
import {prisma} from "@/prisma/prisma";

export async function getPosts(){
    const postData = await prisma.post.findMany({
        take: 5,
        where :{
            NOT: {title: ""}
        },
        include: {postImages: {take: 1}}
    });

    return postData;
}


export type Post = Awaited<ReturnType<typeof getPosts>>[number];