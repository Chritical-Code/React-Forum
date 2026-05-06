'use client';
import { useState, useEffect } from "react";
import type {Post} from "@/src/actions/post/getPosts"
import PostBox from "@/src/components/post/PostBox";
import { getPosts } from "@/src/actions/post/getPosts";

export default function PostBrowser(){
    const [postData, setPostData] = useState<Post[]>([]);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts(){
        setPostData(await getPosts());
    }

    const postBoxes = postData.map((post) => {
        return(
            <PostBox key={post.id} post={post} viewOrEdit="view"></PostBox>
        );
    });
    
    return(
        <>
            <p>post browser</p>
            {postBoxes}
        </>
    );
}