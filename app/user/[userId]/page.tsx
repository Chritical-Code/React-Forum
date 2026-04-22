import {prisma} from "@/prisma/prisma";
import PostBox from "@/src/components/PostBox";
import { Post } from "@/src/generated/prisma/client";
import { notFound } from "next/navigation";

type UserProps = {
    params: Promise<{
        userId: string;
    }>
}

export default async function User({params}: UserProps){
    const resolved = await params;

    const user = await prisma.user.findFirst({
        where: {OR: [{id: resolved.userId}, {name: {contains: resolved.userId, mode: "insensitive"}}]}
    });

    if(!user){notFound();}
    
    const posts = await prisma.post.findMany({
        where: {authorId: user?.id}
    });
    
    const postBoxes = posts.map((post: Post, index) => {
        return(
            <PostBox key={index} post={post} viewOrEdit="view"></PostBox>
        );
    });
    
    return(
        <>
            <img className="w-20 h-20 m-1" src={user?.image ?? ""}></img>
            <p>Username: {user?.name}</p>
            <p>Email: {user?.email}</p>

            <div className="flex flex-col items-center">
                {postBoxes}
            </div>
        </>
    );
    
}