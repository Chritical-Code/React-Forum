import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";
import { Post } from "@/src/generated/prisma/client";
import Form from 'next/form'
import {newPost} from "@/src/actions/post/newPost";
import PostBox from "@/src/components/post/PostBox";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if(!session){return(<p>Must be logged in.</p>);}

    const posts = await prisma.post.findMany({
        where: {authorId: session?.user.id}
    });

    const postBoxes = posts.map((post: Post, index) => {
        return(
            <PostBox key={index} post={post} viewOrEdit="edit"></PostBox>
        );
    });
    
    const user = await prisma.user.findUnique({
        where: {
            id: session.user?.id,
        }
    });

    return (
        <>
            <h1 className="font-bold m-1">Profile</h1>
            <img className="w-20 h-20 m-1" src={user?.image ?? "null"}></img>
            <a href={"/user/" + user?.id} className="">{session?.user?.name}</a>
            <p className="">{session?.user?.email}</p>
            <a className="btn m-2" href="/api/auth/signout">
                Sign out
            </a>

            <div className="flex items-center w-94 md:w-124 mt-1 mb-1">
                <a href="/user/likes" className="btn">Likes</a>
                <div className="grow"></div>
                <a className="btn">Favorites</a>
            </div>

            <div className="flex flex-col items-center w-94 md:w-124 border-t">
                <div className="flex items-center w-full border-b pt-1 pb-1">
                    <h2 className="font-bold ml-1">Manage Posts</h2>

                    <div className="grow"></div>

                    <Form action={newPost} className="">
                        <button type="submit" className="btn">New Post</button>
                    </Form>
                </div>

                <div className="flex flex-col items-center">
                    {postBoxes}
                </div>
            </div>
        </>
    );
}
