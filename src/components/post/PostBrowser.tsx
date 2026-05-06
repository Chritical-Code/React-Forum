'use client';
import { useState, useEffect, useRef } from "react";
import type {Post} from "@/src/actions/post/getPosts"
import PostBox from "@/src/components/post/PostBox";
import { getPosts } from "@/src/actions/post/getPosts";

export default function PostBrowser(){
    const [postData, setPostData] = useState<Post[]>([]);
    const cursor = useRef("");

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts(){
        const newPosts = await getPosts(cursor.current);
        setPostData(postData => [...postData, ...newPosts]);

        if(newPosts.length > 0){
            cursor.current = newPosts[(newPosts.length -1)].id;
        }
    }

    const postBoxes = postData.map((post, index) => {
        return(
            <PostBox key={post.id + index} post={post} viewOrEdit="view"></PostBox>
        );
    });

    async function handleLoadButton(){
        loadPosts();
    }
    
    return(
        <>
            <p>post browser</p>
            {postBoxes}
            <button onClick={() => handleLoadButton()} className="btn">Load</button>
        </>
    );
}