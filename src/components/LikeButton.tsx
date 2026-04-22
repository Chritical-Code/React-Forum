'use client';
import Form from "next/form";
import { likePost } from "@/src/actions/likePost";
import { useState, useEffect } from "react";
import { getLiked } from "@/src/actions/getLiked";
import { getNumLikes } from "@/src/actions/getNumLikes";

type LikeButtonProps = {
    postId: string,
}

export default function LikeButton({postId}: LikeButtonProps){
    const [liked, setLiked] = useState<boolean>(false);
    const [numLikes, setNumLikes] = useState<number>(0);

    useEffect(() => {
        reloadLiked();
    }, []);

    async function reloadLiked(){
        setLiked(await getLiked({postId}));
        setNumLikes(await getNumLikes({postId}));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget);
        await likePost(formData);
        reloadLiked();
    }

    return(
        <>
            <Form action={async () => {}} onSubmit={handleSubmit}>
                <button type="submit" className="mr-1 text-5xl text-center hover:cursor-pointer">
                    <Heart liked={liked}></Heart>
                </button>
                <input type="hidden" name="postId" value={postId}></input>
            </Form>

            <p>{numLikes}</p>
        </>
    );
}

type HeartProps = {
    liked: boolean,
}

function Heart({liked}: HeartProps){
    if(liked){
        return(
            <p className="text-pink-600">♥︎</p>
        );
    }
    else{
        return(
            <p className="text-pink-300">♥︎</p>
        );
    }
}