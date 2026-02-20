import {prisma} from "@/prisma/prisma";

type ViewPostProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function ViewPost({params}: ViewPostProps){
    const resolved = await params;

    const post = await prisma.post.findUnique({
        where: {id: resolved.postId}
    });

    return(
        <div className="flex flex-col items-center text-center">
            <p>View Post: {post?.id}</p>

            <p>{post?.title}</p>

            <p>{post?.text}</p>
        </div>
    );

}