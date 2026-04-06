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
            <div className="flex flex-col items-center overflow-y-scroll w-full">
                <h1 className="font-bold m2">Profile</h1>
                <img className="w-20 h-20 m2" src={session?.user?.image ?? ""}></img>
                <p className="m2">{session?.user?.name}</p>
                <p className="m2">{session?.user?.email}</p>
                <a className="btn" href="/api/auth/signout">
                    Sign out
                </a>

                <div className="flex items-center w-94 md:w-124 mt-1 mb-1">
                    <a className="btn">Likes</a>
                    <div className="grow"></div>
                    <a className="btn">Favorites</a>
                </div>

                <div className="flex flex-col items-center w-94 md:w-124 border-t">
                    <div className="flex items-center w-full border-b pt-1 pb-1">
                        <h2 className="font-bold">Posts</h2>

                        <div className="grow"></div>

                        <Form action={newPost} className="">
                            <button type="submit" className="btn">New Post</button>
                        </Form>
                    </div>

                    <div className="flex flex-col w-3/5 items-center">
                        {postBoxes}
                    </div>
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
