import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";
import { Post } from "@/src/generated/prisma/client";
import Form from 'next/form'
import {newPost} from "@/src/actions/newPost";
import PostBox from "@/src/components/PostBox";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    const posts = await prisma.post.findMany({
        where: {authorId: session?.user.id}
    });

    const postBoxes = posts.map((post: Post, index) => {
            return(
                <PostBox key={index} post={post} viewOrEdit="edit"></PostBox>
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
                <a className="btn" href="/api/auth/signout">
                    Sign out
                </a>

                <Form action={newPost} className="">
                    <button type="submit" className="btn">New Post</button>
                </Form>

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
