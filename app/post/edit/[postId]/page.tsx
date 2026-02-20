import {makePost} from "@/src/actions/make-a-post";
import Form from 'next/form'

type EditPostProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function EditPost({params}: EditPostProps){
    const resolved = await params

    return(
        <div className="flex flex-col items-center text-center w-full">
            <p>Edit post: {resolved.postId}</p>
            <PostForm />
        </div>
    );
}

function PostForm(){
    return(
        <Form action={makePost} className="flex flex-col items-center w-full">
            <p>Title</p>
            <input type="text" name="title" className="border w-1/5"></input>

            <p>Text</p>
            <textarea name="text" className="border w-2/5"></textarea>

            <button type="submit" className="btn w-16">Submit</button>
        </Form>
    );
}