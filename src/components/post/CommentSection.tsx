'use client';
import Form from "next/form";
import { addComment } from "@/src/actions/comment/addComment";
import { getComments } from "@/src/actions/comment/getComments";
import type { CommentWithAuthor } from "@/src/actions/comment/getComments";
import { useState, useEffect } from "react";
import { getOwnsComment } from "@/src/actions/comment/getOwnsComment";
import { deleteComment } from "@/src/actions/comment/deleteComment";
import { getNumComments } from "@/src/actions/comment/getNumComments";
import LikeButton from "@/src/components/post/LikeButton";

type CommentSectionProps = {
    postId: string,
}

export default function CommentSection({postId}: CommentSectionProps){
    const [commentData, setCommentData] = useState<CommentWithAuthor[]>([]);
    const [numComments, setNumComments] = useState<number>(0);

    useEffect(() => {
        reloadComments();
    }, []);

    async function reloadComments(){
        setCommentData(await getComments({postId}));
        setNumComments(await getNumComments({postId}));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget);
        await addComment(formData);
        reloadComments();
    }

    const comments = commentData.map((comment) => {
        return(
            <CommentComponent key={comment.id} username={comment.author.name} text={comment.text} userId={comment.authorId} 
            pic={comment.author.image} commentId={comment.id} reloadComments={reloadComments}>
            </CommentComponent>
        );
    });
    
    return(
        <>
            <div className="flex flex-row items-center h-12 w-94 md:w-124 p-2 mt-8 shrink-0 border-t border-b">
                <p>Comments - {numComments}</p>
                <div className="flex grow"></div>
                <LikeButton postId={postId}></LikeButton>
            </div>

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
    commentId: string,
    reloadComments: Function,
}

function CommentComponent({username, text, userId, pic, commentId, reloadComments}: CommentProps){
    const [showSettings, setShowSettings] = useState(false);
    
    async function handleClickSettings(){
        if(await getOwnsComment({commentId})){
            setShowSettings(!showSettings);
        }
    }

    async function handleClickDelete(){
        deleteComment({commentId});
        reloadComments();
    }

    let deleteButton = (<></>);
    if(showSettings){
        deleteButton = (
            <button onClick={() => handleClickDelete()}
            className="btn w-8 h-8 m-0 bg-red-700 active:bg-red-800">🗑️</button>
        );
    }
    
    return(
        <div className="flex flex-col w-90 md:w-120 border-b p-1">
            <div className="flex items-center">
                <img src={pic ?? "null"} className="w-8 h-8 mr-2"></img>
                <a href={"/user/" + userId} className="font-bold hover:text-gray-500">{username}</a>
                <div className="grow"></div>
                {deleteButton}
                <button onClick={() => handleClickSettings()} className="w-8 h-8 shrink-0 ml-2 hover:text-gray-500 hover:cursor-pointer">:</button>
            </div>

            <div className="grow">
                <p className="">{text}</p>
            </div>
        </div>
    );
}