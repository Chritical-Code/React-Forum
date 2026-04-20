'use client';
import Form from "next/form";
import { addComment } from "@/src/actions/addComment";
import { getComments } from "@/src/actions/getComments";
import type { CommentWithAuthor } from "@/src/actions/getComments";
import { useState, useEffect } from "react";

type CommentSectionProps = {
    postId: string,
}

export default function CommentSection({postId}: CommentSectionProps){
    const [commentData, setCommentData] = useState<CommentWithAuthor[]>([]);

    useEffect(() => {
        reloadComments();
    }, []);

    async function reloadComments(){
        setCommentData(await getComments({postId}));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget);
        await addComment(formData);
        reloadComments();
    }

    const comments = commentData.map((comment, index) => {
        return(
            <CommentComponent key={index} username={comment.author.name} text={comment.text} userId={comment.authorId} pic={comment.author.image}>
            </CommentComponent>
        );
    });
    
    return(
        <>
            <Form action={async () => {}} onSubmit={handleSubmit} className="flex items-center w-94 md:w-124 p-2 border-b">
                <div className="grow">
                    <textarea name="text" className="border w-full"></textarea>
                </div>
                <button type="submit" className="btn ml-4">Comment</button>
                <input type="hidden" name="postId" value={postId}></input>
            </Form>

            <div className="flex flex-col items-center">
                {comments}
            </div>
        </>
    );
}

type CommentProps = {
    username: string | null,
    text: string,
    userId: string,
    pic:  string | null,
}

function CommentComponent({username, text, userId, pic}: CommentProps){
    return(
        <div className="flex flex-col w-90 md:w-120 border-b p-1">
            <div className="flex items-center">
                <img src={pic ?? ""} className="w-8 h-8 mr-2"></img>
                <a href={"/user/" + userId} className="font-bold hover:text-gray-500">{username}</a>
            </div>

            <div className="grow">
                <p className="">{text}</p>
            </div>
        </div>
    );
}