import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";
import { Post } from "@/src/generated/prisma/client";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    const posts = await prisma.post.findMany({
        where: {authorId: session?.user.id}
    });

    const postBoxes = posts.map((post: Post, index) => {
            return(
                <PostBox post={post} key={index}></PostBox>
            );
    });


    if(session){
        const user = await prisma.user.findUnique({
            where: {
                id: session.user?.id,
            }
        });

        return (
            <div className="flex flex-col items-center overflow-y-scroll">
                <h1 className="font-bold m2">Profile</h1>
                <img className="w-20 h-20 m2" src={session?.user?.image ?? ""}></img>
                <p className="m2">{session?.user?.name}</p>
                <p className="m2">{session?.user?.email}</p>
                <a className="btn h-12 w-20 bg-gray-200 hover:bg-gray-100" href="/api/auth/signout">
                    Sign out
                </a>

                <div className="flex flex-col w-3/5 items-center">
                    {postBoxes}
                </div>
            </div>
        );
    }
    else{
        return(
            <div className="flex flex-col items-center">
                <p>Must be logged in.</p>
            </div>
        );
    }

}

function PostBox({post}: {post: Post}){
    return(
        <a href={"/post/edit/" + post.id}>
            <div className="shrink-0 bg-gray-400 w-2xl h-96 border m-2">
                <p>{post.title}</p>
                <p>{post.text}</p>
            </div>
        </a>
    );
}
