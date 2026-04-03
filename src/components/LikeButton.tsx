'use client';

import Form from "next/form";
import { likePost } from "@/src/actions/likePost";
import { useState } from "react";

type LikeButtonProps = {
    postId: string,
}

export default function LikeButton({postId}: LikeButtonProps){
    //some state

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget);
        await likePost(formData);
        //refresh state
    }

    return(
        <Form action={async () => {}} onSubmit={handleSubmit}>
            <button type="submit" 
            className="mr-1 text-5xl text-center text-pink-300 hover:text-pink-600 hover:cursor-pointer active:text-pink-400">
                ♥︎
            </button>
            <input type="hidden" name="postId" value={postId}></input>
        </Form>
    );
}