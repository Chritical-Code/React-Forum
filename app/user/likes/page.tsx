import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";
import { Post } from "@/src/generated/prisma/client";
import PostBox from "@/src/components/PostBox";

export default async function LikesPage(){
    const session = await getServerSession(authOptions);
    
    const posts = await prisma.post.findMany({
        where: {
            postLikes: {
                some: {
                    authorId: session?.user.id
                }
            }
        }
    });

    const postBoxes = posts.map((post: Post, index) => {
            return(
                <PostBox key={index} post={post} viewOrEdit="view"></PostBox>
            );
    });

    return(
        <>
            <h2 className="font-bold">Your Likes:</h2>

            <div className="flex flex-col w-3/5 items-center">
                {postBoxes}
            </div>
        </>
    );
}