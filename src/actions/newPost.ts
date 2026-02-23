'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

export async function newPost(){
    const session = await getServerSession(authOptions);

    const oldPost = await prisma.post.findFirst({
        where: {AND: {authorId: session?.user.id, title: ""}}
    });
    
    if(oldPost){ //check if we have an untitled post to edit
        redirect("/post/edit/" + oldPost.id);
    }
    else{ //else creat a new post
        const newPost = await prisma.post.create({
            data: {
                title: "",
                text: "",
                author: {connect: {id: session?.user.id}}
            }
        });

        redirect("/post/edit/" + newPost.id);
    }

}