'use server'

import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { connect } from "http2";

export async function makePost(){
    console.log("Make post has been called");

    const session = await getServerSession(authOptions);

    const post = await prisma.post.create({
        data: {
            title: "This is a test title",
            text: "This is test text. This is test text. This is test text. This is test text. This is test text. This is test text.",
            author: {connect: {id: session?.user.id}}
        }
    });
}