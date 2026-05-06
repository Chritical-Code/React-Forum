'use server';
import {prisma} from "@/prisma/prisma";

export async function getPosts(cursor: string){
    const postData = await prisma.post.findMany({
        take: 5,
        skip: cursor ? 1 : 0,   // skip only when cursor exists
        ...(cursor && { cursor: { id: cursor } }),
        where :{
            NOT: {title: ""}
        },
        include: {postImages: {take: 1}}
    });

    return postData;
}


export type Post = Awaited<ReturnType<typeof getPosts>>[number];