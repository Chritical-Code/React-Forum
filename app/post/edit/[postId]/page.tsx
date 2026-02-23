import {updatePost} from "@/src/actions/updatePost";
import Form from 'next/form'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";

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
                <PostForm inTitle={post.title} inText={post.text} postID={resolved.postId} />
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

            <button type="submit" className="btn w-16 bg-gray-200 hover:bg-gray-100">Submit</button>
        </Form>
    );
}