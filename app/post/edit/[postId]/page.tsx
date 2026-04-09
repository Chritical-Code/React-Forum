import {updatePost} from "@/src/actions/updatePost";
import Form from 'next/form'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";
import {deletePost} from "@/src/actions/deletePost";
import ImageManager from "@/src/components/ImageManager";

type EditPostProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function EditPost({params}: EditPostProps){
    const session = await getServerSession(authOptions);
    const resolved = await params;

    const post = await prisma.post.findFirst({
        where: {AND: {authorId: session?.user.id, id: resolved.postId}}
    });
 
    if(post){
        return(
            <>
                <h2 className="font-bold">Edit Post</h2>

                <ImageManager postId={post.id}></ImageManager>

                <PostForm inTitle={post.title} inText={post.text} postID={resolved.postId} />

                <Form action={deletePost}>
                    <input type="hidden" name="postId" value={resolved.postId}></input>
                    <button type="submit" className="btn bg-red-700">Delete</button>
                </Form>
            </>
        );
    }
    else{
        return(
            <div>
                <p>Invalid post or permissions.</p>
            </div>
        );
    }
}

type PostFormProps = {
    inTitle: string,
    inText: string,
    postID: string
}

function PostForm({inTitle, inText, postID}: PostFormProps){
    return(
        <Form action={updatePost} className="flex flex-col items-center w-full">
            <h2 className="font-bold">Title</h2>
            <input type="text" name="title" className="border w-90 md:w-120" defaultValue={inTitle}></input>

            <h2 className="font-bold">Text</h2>
            <textarea name="text" className="border w-90 md:w-120" defaultValue={inText}></textarea>

            <input type="hidden" name="postId" value={postID}></input>

            <button type="submit" className="btn">Save</button>
        </Form>
    );
}