import {updatePost} from "@/src/actions/updatePost";
import Form from 'next/form'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";
import {deletePost} from "@/src/actions/deletePost";
import { uploadMedia } from "@/src/actions/uploadMedia";
import MyImg from "@/src/components/MyImg";

type EditPostProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function EditPost({params}: EditPostProps){
    const session = await getServerSession(authOptions);
    const resolved = await params

    //get post where userid and post id match
    const post = await prisma.post.findFirst({
        where: {AND: {authorId: session?.user.id, id: resolved.postId}}
    });

    //fill in form with gathered data
    if(post){
        return(
            <div className="flex flex-col items-center text-center w-full">
                <p>Edit post: {resolved.postId}</p>

                <div className="flex flex-col w-120 h-80 overflow-y-scroll overflow-x-hidden border">
                    <MyImg></MyImg>
                    <MyImg></MyImg>
                    <MyImg></MyImg>
                </div>

                <Form action={uploadMedia} className="flex">
                    <input type="hidden" value={resolved.postId} name="postId"></input>
                    <input type="file" name="image" className="btnf" ></input>
                    <button type="submit" className="btn">Upload</button>
                </Form>

                <PostForm inTitle={post.title} inText={post.text} postID={resolved.postId} />

                <Form action={deletePost}>
                    <input type="hidden" name="postId" value={resolved.postId}></input>
                    <button type="submit" className="btn bg-red-700">Delete</button>
                </Form>
            </div>
        );
    }
    else{
        return(
            <div>
                <p>Invalid post or permissions.</p>
            </div>
        );
    }

    //deny if incorrect data
}

type PostFormProps = {
    inTitle: string,
    inText: string,
    postID: string
}

function PostForm({inTitle, inText, postID}: PostFormProps){
    return(
        <Form action={updatePost} className="flex flex-col items-center w-full">
            <p>Title</p>
            <input type="text" name="title" className="border w-1/5" defaultValue={inTitle}></input>

            <p>Text</p>
            <textarea name="text" className="border w-2/5" defaultValue={inText}></textarea>

            <input type="hidden" name="postId" value={postID}></input>

            <button type="submit" className="btn">Save</button>
        </Form>
    );
}